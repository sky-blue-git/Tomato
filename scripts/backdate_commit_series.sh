#!/bin/sh
set -e
BRANCH="main"
REMOTE="origin"

# Verify repo
git rev-parse --is-inside-work-tree >/dev/null 2>&1 || { echo "Not a git repo" >&2; exit 1; }

# Collect changed files
CHANGED_LIST="$(mktemp)"
git ls-files -m -o --exclude-standard > "$CHANGED_LIST"
if [ ! -s "$CHANGED_LIST" ]; then echo "No local changes."; exit 0; fi
TOTAL=$(wc -l < "$CHANGED_LIST" | tr -d ' ')
echo "Will backdate $TOTAL commits (one per file)."

# Build schedule file
SCHEDULE_FILE="$(mktemp)"
python3 - << 'PY' > "$SCHEDULE_FILE"
import random, datetime
start = datetime.date.fromisoformat("2025-08-21")
end = datetime.date.fromisoformat("2025-09-05")
slots = []
cur = start
while cur <= end:
    n = random.choice([1,2])
    for _ in range(n):
        t = datetime.time(random.randint(10,19), random.randint(0,59), random.randint(0,59))
        slots.append(datetime.datetime.combine(cur, t))
    cur += datetime.timedelta(days=1)
slots.sort()
for s in slots:
    print(s.isoformat())
PY

# Open schedule for reading
SLOT=""
get_slot() {
  if read -r SLOT; then
    echo "$SLOT"
    return 0
  else
    # If schedule exhausted, reuse last slot + 1 minute each time
    LAST="${SLOT:-2025-09-05T19:00:00}"
    # Simple increment: not strictly accurate but fine
    echo "$LAST"
    return 0
  fi
}

# Commit each file with a schedule timestamp
# shellcheck disable=SC2162
exec 3< "$SCHEDULE_FILE"
while IFS= read -r FILE; do
  [ -z "$FILE" ] && continue
  # get next slot from fd 3
  if IFS= read -r WHEN <&3; then :; else WHEN="2025-09-05T19:00:00"; fi
  git add -- "$FILE"
  GIT_AUTHOR_DATE="$WHEN" GIT_COMMITTER_DATE="$WHEN" git commit -m "feat(ui): update $FILE"
done < "$CHANGED_LIST"
exec 3>&-

echo "Pushing..."
 git push "$REMOTE" "$BRANCH"
