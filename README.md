# Vue-synth

# To-do

- [x] Refactor legacy code using typescript and scss
- [ ] new design
- [ ] Emits and props with typing
- [x] Main wave with audio api visual analyzer (maybe other waves too)
- [ ] 4 Waves
  - [x] Amplitude and freq controls
  - [x] Individual sound
  - [ ] responsive and component based css
  - [ ] disabled state (involves parent)
  - [ ] Color change
- [ ] Main wave (sum of all colors)
- [ ] Actual wave (what is being played in the piano)
- [ ] 2 Filters
- [ ] sampler
- [ ] Piano
- [ ] Midi capabilities
- [ ] Effects
- [ ] Preset saver.
- [ ] Reverb
- [ ] Turn test elements into widgets

  - the view should only be responsible for the data. It should contain the layout and pass into it some widgets. The card list should be a widget, the effects list should be a widget etc just as the wave displays are.

- [ ] Start an oscillator stopped (if that makes any sense)
- [ ] pass options to an audio context
- [ ] Nodes include their context => it is not necesary to pass the context as a prop.
- [ ] If a node alredy has a filter it is non selectable
- [ ] Oscillators must be ref in order for the filters to be able to select them
- [ ] Pass gain node as main node to attach a filter

- Maybe it is better to initialize everything with a filter with a cutoff of 0. if a filter is detached we don't disconnect it, we just set its cutoff to 0.
