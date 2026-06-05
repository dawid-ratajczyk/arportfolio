import os
import time

cutoff = time.time() - 3600 * 6
roots = [
    r"C:\Users\bruno",
    r"C:\Users\bruno\.cursor",
]
exts = {".jpg", ".jpeg", ".png", ".webp"}
found = []
for root in roots:
    if not os.path.isdir(root):
        continue
    for dirpath, dirnames, files in os.walk(root):
        dirnames[:] = [d for d in dirnames if d not in {"node_modules", ".git", "curseforge", ".vscode"}]
        for name in files:
            if os.path.splitext(name.lower())[1] not in exts:
                continue
            path = os.path.join(dirpath, name)
            try:
                mtime = os.path.getmtime(path)
            except OSError:
                continue
            if mtime >= cutoff:
                found.append((mtime, path, os.path.getsize(path)))

for mtime, path, size in sorted(found, reverse=True)[:40]:
    print(time.strftime("%Y-%m-%d %H:%M:%S", time.localtime(mtime)), size, path)
