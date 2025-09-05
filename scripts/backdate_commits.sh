#!/usr/bin/env bash
set -euo pipefail

BRANCH="main"
REMOTE="origin"
START_DATE="2025-08-21"
END_DATE="2025-09-05"

echo "Preparing backdated commit schedule from $START_DATE to $END_DATE..."

if ! git rev-parse --is-inside-work-tree >/dev/null 2>&1; then
  echo "Not inside a git repo" >&2
  exit 1
fi

TMPDIR="$(mktemp -d)"
trap 'rm -rf "$TMPDIR"' EXIT

# Collect changed files into a list file (supports old bash)
CHANGED_LIST="$TMPDIR/changed.txt"

git ls-files -m -o --exclude-standard > "$CHANGED_LIST"
if [ ! -s "$CHANGED_LIST" ]; then
  echo "No local changes to backdate." >&2
  exit 0
fi

CHANGED_COUNT=$(wc -l < "$CHANGED_LIST" | tr -d ' ')
echo "Found ${CHANGED_COUNT} changed files."

# Save working copies
while IFS= read -r f; do
  [ -z "$f" ] && continue
  mkdir -p "$TMPDIR/work/$(dirname "$f")"
  cp -f "$f" "$TMPDIR/work/$f"
done < "$CHANGED_LIST"

echo "Saved working copies to $TMPDIR/work"

# Reset working tree
git checkout -- .
git clean -fd >/dev/null 2>&1 || true

# Build schedule
python3 - << PY > "$TMPDIR/schedule.txt"
import random, datetime
start = datetime.date.fromisoformat("2025-08-21")
end = datetime.date.fromisoformat("2025-09-05")
days = (end - start).days + 1
slots = []
for d in range(days):
    date = start + datetime.timedelta(days=d)
    for _ in range(random.choice([1,2])):
        hour = random.randint(10,19)
        minute = random.randint(0,59)
        second = random.randint(0,59)
        slots.append(datetime.datetime.combine(date, datetime.time(hour, minute, second)))
slots.sort()
for s in slots:
    print(s.isoformat())
PY

SCHEDULE_COUNT=$(wc -l < "$TMPDIR/schedule.txt" | tr -d ' ')
echo "Generated ${SCHEDULE_COUNT} scheduled timestamps."

# Commit helper (works on old bash)
commit_with_date() {
  when="$1"; shift
  GIT_AUTHOR_DATE="$when" GIT_COMMITTER_DATE="$when" git commit -m "$1"
}

idx=0
slot_idx=0
TOTAL_COMMITS=$CHANGED_COUNT

# Iterate files and commit 1-2 files per slot
while IFS= read -r when && [ $idx -lt $TOTAL_COMMITS ]; do
  files_this_commit=1
  # random 1 or 2 (fallback using date hash)
  if [ $((RANDOM % 2)) -eq 0 ] && [ $((idx+1)) -lt $TOTAL_COMMITS ]; then
    files_this_commit=2
  fi
  k=0
  while [ $k -lt $files_this_commit ] && [ $idx -lt $TOTAL_COMMITS ]; do
    file_to_commit=$(sed -n "$((idx+1))p" "$CHANGED_LIST")
    mkdir -p "$(dirname "$file_to_commit")"
    cp -f "$TMPDIR/work/$file_to_commit" "$file_to_commit"
    git add "$file_to_commit"
    idx=$((idx+1))
    k=$((k+1))
  done
  commit_with_date "$when" "feat(ui): premium redesign updates"
done < "$TMPDIR/schedule.txt"

echo "Created $idx backdated commits. Pushing..."

git push "$REMOTE" "$BRANCH"

echo "Done."
