# Vue synth

## To do

- [x] Refactor AudioModule into linked list
- [ ] V-model or at least reactive wave names in filters
- [ ] Revise filter module selection by name (can be faulty)
- [ ] Main wave effect chain
- [ ] Piano widget
- [ ] Sound Attack, delay... controls
- [ ] change :class bidings to :class= {active:isActive}

## Bugs

- FilterWidget: Each time it is mounted a different analyzer is created. This can be easily checked using the debugger. This shouldn't be happening
