#!/bin/bash
set -e
mkdir -p _raw
paths=(radio/antennas other-radio other-radio/swl other-radio/frs home home/hf_net home/digi_net amateur/modes amateur/modes/SSTV home/memes other-radio/GMRS amateur/modes/FTn amateur amateur/licensing home/VETesting Testing/TestDay home/fcof)
for p in "${paths[@]}"; do
  fn=$(echo "$p" | sed 's#/#__#g')
  curl -sS "http://172.232.29.61/en/$p" -o "_raw/$fn.html"
  echo "$p -> _raw/$fn.html ($(wc -c < _raw/$fn.html) bytes)"
done
