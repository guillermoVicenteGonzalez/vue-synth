export class Wave{
    constructor(amp, frec, phase = 0){
        this.amplitude = amp;
        this.frequency = frec;
        this.phase = phase;
        this.form = "sine"
    }

    calculatePoints(length=100,step=0){
        let points = []
        let y;
        let angFrec = (this.frequency * 2 * Math.PI) / length;

        for(let x=0; x<length; x++){
            y =  this.amplitude * Math.sin(x * angFrec + step); // + height/2
            points.push(y)
        }

        return points;
    }

    getPeriod(){
        return 1/this.frequency;
    }

    generateSquareWavePoints(pulseLength, length=100){
        let points = [];
        let y = 0;
        let period = this.getPeriod();
        let A = (this.amplitude * (pulseLength / period) ) +(2*this.amplitude / Math.PI);
        let angFrec = (this.frequency * 2 * Math.PI) / length;

        for(let x=0; x<length;x++){
            x++;
            y = A * (1/Math.sin());
        }
    }

    getAmplitude(){
        return this.amplitude;
    }
    
    getFrequency(){
        return this.frequency;
    }

    getAngFrec(){
        return this.frequency * 2 * Math.PI;
    }

    getPhase(){
        return this.phase;
    }

    setAmplitude(nAmp){
        this.amplitude = nAmp;
    }

    setFrequency(nFrec){
        this.frequency = nFrec;
    }

    setPhase(nPhase){
        this.phase = nPhase;
    }
}

