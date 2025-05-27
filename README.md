# Vue synth

## Todo

### Features

- [-] Piano widget
  - [ ] Visuals
  - [ ] Key functionality
    - [x] Natural keys
    - [x] Altered keys
    - [ ] Change central note
- [ ] Audio module effects
  - [ ] Wave distortion => wave shaper
  - [ ] Voices => possibly wave shaper?? or just a number to clone oscs
    - [ ] Voice detuning
- [ ] Global effects
  - [ ] widget
  - [x] Envelope?
    - [x] Attack
    - [x] Sustain
    - [x] Release
    - [x] Decay
  - [ ] Filters
  - [ ] Echo
  - [ ] Chorus
  - [ ] Compression
  - [ ] Distortion
  - [ ] LFO's
- [ ] Controls
  - [x] Writable module freqs
  - [x] Module Freq reset to 440
  - [x] Module deletion
  - [x] Global clear
    - [x] Filters
    - [x] Modules
  - [ ] Global "detuning"
  - [ ] Wheel
- [ ] Global volume controls
- [ ] Dynamic layouts / effects bar
- [ ] Responsive
- [ ] MIDI interfacing

### What ifs

- [ ] Recorder
- [ ] Audio tracks / DAW
- [ ] Sampler
- [ ] Metronome
- [ ] Base
- [ ] Audio imports
- [ ] Audio envelope progress when key is pressed

### Bugs / fixes / refactors

- [x] Refactor AudioModule into linked list
- [ ] turn mutated props into v-models
- [ ] Vanilla wave sum displays deactivated waves
- [ ] Wave frequency is not dynamic => refactor with constant source?
- [ ] V-model or at least reactive wave names in filters
- [ ] Revise filter module selection by name (can be faulty)
- [ ] Main wave effect chain
- [x] change :class bidings to :class= {active:isActive}
- [ ] Memory leaks in Wave analyser and filter widget (and possibly wave canvas)

### Notes

- FilterWidget: Each time it is mounted a different analyzer is created. This can be easily checked using the debugger. This shouldn't be happening
