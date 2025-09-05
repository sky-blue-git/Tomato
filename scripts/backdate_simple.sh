#!/usr/bin/env bash
set -euo pipefail

BRANCH="main"
REMOTE="origin"

if ! git rev-parse --is-inside-work-tree >/dev/null 2>&1; then
  echo "Not a git repo" >&2; exit 1; fi

CHANGED_LIST="$(mktemp)"
git ls-files -m -o --exclude-standard > "$CHANGED_LIST"
if [ ! -s "$CHANGED_LIST" ]; then echo "No local changes."; exit 0; fi

python3 - << 'PY' > /tmp/schedule_simple.txt
import random, datetime
start = datetime.date.fromisoformat("2025-08-21")
end = datetime.date.fromisoformat("2025-09-05")
slots = []
cur = start
while cur <= end:
    for _ in range(random.choice([1,2])):
        t = datetime.time(random.randint(10,19), random.randint(0,59), random.randint(0,59))
        slots.append(datetime.datetime.combine(cur, t))
    cur += datetime.timedelta(days=1)
slots.sort()
for s in slots:
    print(s.isoformat())
PY

mapfile -t SCHEDULE < /tmp/schedule_simple.txt || true
idx=0
slot=0
TOTAL=$(wc -l < "$CHANGED_LIST" | tr -d ' ')
echo "Committing $TOTAL files across ${#SCHEDULE[@]} slots..."

while IFS= read -r f; do
  [ -z "$f" ] && continue
  when="${SCHEDULE[$slot]}"
  git add "$f"
  GIT_AUTHOR_DATE="$when" GIT_COMMITTER_DATE="$when" git commit -m "feat(ui): update $f"
  if [ $slot -lt $(( ${#SCHEDULE[@]} - 1 )) ]; then slot=$((slot+1)); fi
  idx=$((idx+1))
done < "$CHANGED_LIST"

git push "$REMOTE" "$BRANCH"
