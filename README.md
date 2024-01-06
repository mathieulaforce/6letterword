# 6 letter word
![github build and test badge](https://github.com/mathieulaforce/6letterword/actions/workflows/main.yml/badge.svg)

## 6 letter words

input.txt  contains words of varying lengths (1 to 6 characters).

The objective is to show all combinations of those words that:

- Together form a word of 6 characters.
- That combination must also be present in input.txt.

You can start by only supporting combinations of two words and improve the algorithm at the end of the exercise to support any combinations.


### Example

When the program is run with this input:
```
foobar
fo
o
bar
```

Then the program should ouput:
```
fo+o+bar=foobar
```