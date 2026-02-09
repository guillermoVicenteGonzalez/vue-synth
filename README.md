# Vue synth

## Todo

- [x] Loops
- [x] mp3
- [x] mix audio
- [x] mixins for toggled, hover etc
- [x] Restart + context menus
- [x] load tracks
- [ ] trim
- [ ] Accesibility

- [ ] Options => Presets, clear all, other settings, settings menu
      tooltips
      sawwaves

### Features

- [-] Piano widget
  - [x] Visuals
  - [x] Key functionality
    - [x] Natural keys
    - [x] Altered keys
    - [x] Change central note
- [x] Audio module effects
  - [x] Voices => possibly wave shaper?? or just a number to clone oscs
    - [x] Voice detuning
- [ ] Global effects
  - [x] widget
  - [x] Envelope?
    - [x] Attack
    - [x] Sustain
    - [x] Release
    - [x] Decay
  - [x] Filters
  - [x] Reset button for filters
  - [x] Chorus
  - [x] Compression
  - [x] Distortion
  - [x] LFO's
  - [x] Flanger?
  - [ ] Phaser
  - [x] EQUALIZER !!!!
  - [x] Delay
  - [x] Reverb
  - [x] Wha wha
- [ ] Controls
  - [x] Writable module freqs
  - [x] Module Freq reset to 440
  - [x] Module deletion
  - [x] Global clear
    - [x] Filters
    - [x] Modules
  - [x] Global "detuning"a
  - [ ] Wheel
- [x] Global volume controls
- [x] Dynamic layouts / effects bar
- [x] Responsive
- [x] MIDI interfacing

## Extra Features

- [-] Recorder
  - [x] Slots functionality
  - [x] Wrap audio element inside MediaElementAudioSourceNode https://www.youtube.com/watch?v=idhb45lc2xo
  - [x] Loop functionality
  - [x] Recorder state bug
  - [x] Dynamic control styles
  - [x] Backing tracks
  - [x] save audio / download audio
  - [ ] Trim audio?
    - blob => audioBuffer.
  - [x] Load audio (url or file??)
  - [x] Mix audio (audio encoder)
    - Recorder => blob => audioBuffer / MediaElement....
- [ ] Metronome
- [ ] As many MIDI mappings as possible
- [x] Request midi button + selector disable
- [ ] Panic button for keyboard + disable midi triggers note off
- [ ] Save presets

## Polish

- [ ] Responsive effects (responsive in general)
- [x] Add resets
- [ ] Add tooltips
- [ ] Invert disable toggles
- [ ] sawwaves representation
- [ ] Disable canvases
- [x] Button effects
- [x] font
- [ ] Lighthouse
- [ ] Dialog
  - [ ] Dialog for naming downloads

## Bugs

- [ ] Filters are not detached appropiately
- [ ] Delete all does not work
- [ ] adjust sliders (especially reverb)
- [ ] add titles to envelope and LFO
- [ ] Number inputs work really bad
- [ ] Distortion widget breaks with high res screens (for some unknown reason)
- [ ] Prevent suspension

### What ifs

- [ ] Custom midi mappings
- [ ] Audio imports
- [ ] Audio envelope progress when key is pressed
- [ ] Sampler

## Release 2 (order is important)

- [ ] White label theming that works with scss
- [ ] Rework basic widgets
- [ ] Rethink architecture.
- [ ] Trim audio
