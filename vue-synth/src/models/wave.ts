enum waveForms {
  sine,
  square,
  triangle,
  sawtooth
}

export default class Wave {
  amplitude: number
  frequency: number
  phase: number
  form: waveForms

  constructor(amp: number, frec: number, phase: number = 0) {
    this.amplitude = amp
    this.frequency = frec
    this.phase = phase
    this.form = waveForms.sine
  }

  calculatePoints(length: number, step: number): number[] {
    switch (waveForms[this.form]) {
      case 'sine':
        return this.generateSinWave(length, step)
      case 'square':
        return this.generateSquareWave(length, step)
      case 'triangle':
        return this.generateTriangleWave(length, step)
      case 'sawtooth':
        return this.generateSawToothWave(length, step)
      default:
        return []
    }
  }

  generateSinWave(length = 100, step = 0): number[] {
    const points: number[] = []
    let y: number
    const angFrec: number = (this.frequency * 2 * Math.PI) / length

    for (let x = 0; x < length; x++) {
      y = this.amplitude * Math.sin(x * angFrec + step) // + height/2
      points.push(y)
    }

    return points
  }

  generateSquareWave(length: number, step: number) {
    const points: number[] = []
    let y: number
    const angFrec: number = (this.frequency * 2 * Math.PI) / length

    for (let x = 0; x < length; x++) {
      y = ((2 * this.amplitude) / Math.PI) * Math.asin(Math.sin(angFrec * x + step))
      points.push(y)
    }

    return points
  }

  generateTriangleWave(length: number, step: number) {
    const points: number[] = []
    let y: number
    const angFrec: number = (this.frequency * 2 * Math.PI) / length

    for (let x = 0; x < length; x++) {
      y = ((2 * this.amplitude) / Math.PI) * Math.asin(Math.sin(angFrec * x + step))
      points.push(y)
    }

    return points
  }

  generateSawToothWave(length: number, step: number) {
    const points: number[] = []
    let y: number
    const angFrec: number = (this.frequency * 2 * Math.PI) / length

    for (let x = 0; x < length; x++) {
      y =
        this.amplitude *
        (0.5 - 1 / Math.PI) *
        (Math.pow(-1, x) * (Math.sin(angFrec * x + step) / x))
      points.push(y)
    }

    return points
  }

  //adds the waves passed attending to its waveform
  //returns the points of the resulting wave
  static addWaves(waves: Wave[], length: number, step: number): number[] | boolean {
    if (!Array.isArray(waves) || waves.length == 0) {
      return false
    }

    if (waves.length == 1) {
      return waves[0].calculatePoints(length, step)
    }

    let points: number[] = waves[0].calculatePoints(length, step)
    for (let i = 1; i < waves.length; i++) {
      const temp = waves[i].calculatePoints(length, step)
      points = points.map((item, index) => {
        return item + temp[index]
      })
    }
    return points
  }

  getPeriod(): number {
    return 1 / this.frequency
  }

  getAmplitude(): number {
    return this.amplitude
  }

  getFrequency(): number {
    return this.frequency
  }

  getAngFrec(): number {
    return this.frequency * 2 * Math.PI
  }

  getPhase(): number {
    return this.phase
  }

  setAmplitude(nAmp: number): void {
    this.amplitude = nAmp
  }

  setFrequency(nFrec: number): void {
    this.frequency = nFrec
  }

  setPhase(nPhase: number): void {
    this.phase = nPhase
  }

  getForm(): string {
    return waveForms[this.form]
  }

  setForm(nForm: string) {
    // const validValues = ["sine","square","triangle"];
    // if(!validValues.includes(nForm)){
    //     return false;
    // }else{
    //     this.form = nForm;
    // }
    this.form = waveForms[nForm as keyof typeof waveForms]
  }
}
