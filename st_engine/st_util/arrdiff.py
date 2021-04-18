def arrdiff(first, second):
  i = 0
  diff = 0
  for item in first :
    if second[i] != item :
      diff = diff + 1
    
    i = i + 1

  return diff
