export class Wave{
    constructor(amp, frec, phase = 0){
        this.amplitude = amp;
        this.frequency = frec;
        this.phase = phase;
    }

    calculatePoints(length=100){
        let points = []
        let y;
        let angFrec = (this.frequency * 2 * Math.PI) / length;

        for(let x=0; x<length; x++){
            y =  this.amplitude * Math.sin(x * angFrec); // + height/2
            points.push(y)
        }

        return points;
    }

    getAmplitude(){
        return this.amplitude;
    }
    
    getFrequency(){
        return this.frequency;
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

