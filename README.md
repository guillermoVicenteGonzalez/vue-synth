# VSynth

Vsynth (temporary name) is a web digital audio synthesizer that runs using the web audio api.

It is still in alpha version (although really close to the initial beta release). However, it is already functional an supports the following features

- Up to 5 wave forms.
  - Up to 16 voices per wave form
  - Sypports Wave form voice detuning
- Up to 5 filters to apply to wave forms
- 4 LFO's to apply to a **SINGLE** input.
- A transpose slider
- A basic envelope control featuring attack, decay, sustain and release
- MIDI playback
- Recorder with up to 4 tracks.
  - Supports downloads in mp3 format
  - Supports track upload (also in mp3 format)
- A transpose slider
- A metronome

The progress of the project as well as upcoming features can be seen below

## Current feature (Presets)

- [ ] Refactor LFO widget to use v-model instead of internal model
- [ ] Refactor wave module disabled to use internal property instead of component ref
- [ ] Duplicate names in cluster modules

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
- [x] Global effects
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
  - [x] Global "detuning"
  - [ ] Pitch bend wheel
- [x] Global volume controls
- [x] Dynamic layouts / effects bar
- [x] Responsive
- [x] MIDI interfacing

## Extra Features

- [x] Recorder
  - [x] Slots functionality
  - [x] Wrap audio element inside MediaElementAudioSourceNode https://www.youtube.com/watch?v=idhb45lc2xo
  - [x] Loop functionality
  - [x] Recorder state bug
  - [x] Dynamic control styles
  - [x] Backing tracks
  - [x] save audio / download audio
  - [ ] Trim audio?
  - [x] Load audio (url or file??)
  - [x] Mix audio (audio encoder)
- [x] Metronome
- [ ] As many MIDI mappings as possible
- [x] Request midi button + selector disable
- [ ] Panic button for keyboard + disable midi triggers note off
- [ ] Save presets

## Polish

- [ ] Responsive effects (responsive in general)
- [x] Add resets
- [x] Add tooltips
- [x] Invert disable toggles
- [x] sawwaves representation
- [ ] Disable canvases
- [x] Button effects
- [x] font
- [ ] Lighthouse
- [ ] Dialog
  - [ ] Dialog for naming downloads

## Bugs

- [x] Filters are not detached appropiately
- [x] Delete all does not work
- [ ] adjust sliders (especially reverb)
- [x] add titles to envelope and LFO
- [ ] Number inputs work really bad
- [ ] Distortion widget breaks with high res screens (for some unknown reason)
- [ ] Prevent suspension

### What ifs

- [ ] Custom midi mappings
- [ ] Audio imports
- [ ] Audio envelope progress when key is pressed
- [ ] Sampler
- [ ] Low resources mode

## Release 2 (order is important)

- [ ] White label theming that works with scss
- [ ] Rework basic widgets
- [ ] Rethink architecture.
  - [ ] Audio library
  - [ ] Frontend library
  - [ ] General program (PWA)
- [ ] Trim audio
