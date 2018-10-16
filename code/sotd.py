#!/usr/bin/env python

# push with: scp -r code/* tilde.town:~/code/
# make executable: chmod +x sotd.py
import csv
with open ("/home/caff/code/sotdbot/sotd-2018-05-31.csv") as f:
    reader = csv.reader(f)
    next(reader)
    data = []
    for row in reader:
        # data.append(row)
	if row[2] == "greely":
		print row[3]