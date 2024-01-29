export class Wave{
    constructor(amp, frec, phase = 0){
        this.amplitude = amp;
        this.frequency = frec;
        this.phase = phase;
        this.form = "sine"
    }

    calculatePoints(length,step){
        switch(this.form){
            case "sine":
                return this.generateSinWave(length, step);

            case "square":
                return this.generateSquareWave(length,step);

            case "triangle":
                return this.generateTriangleWave(length,step);

            case "sawtooth":
                return this.generateSawToothWave(length,step);
        }
    }
    generateSinWave(length=100,step=0){
        let points = []
        let y;
        let angFrec = (this.frequency * 2 * Math.PI) / length;

        for(let x=0; x<length; x++){
            y =  this.amplitude * Math.sin(x * angFrec + step); // + height/2
            points.push(y)
        }

        return points;
    }

    //a square wave can be defined as the sign func of a sinusoid
    generateSquareWave(length,step){
        let points = []
        let y;
        let angFrec = (this.frequency * 2 * Math.PI) / length;

        for(let x=0; x<length; x++){
            y =  this.amplitude * Math.sign(Math.sin(x * angFrec + step)); // + height/2
            // y = Math.sign(y);
            points.push(y)
        }

        return points;
    }

    generateTriangleWave(length, step){
        let points = [];
        let y;
        let angFrec = (this.frequency * 2 * Math.PI) / length;
        
        for(let x=0; x<length; x++){
            y = (2 * this.amplitude /Math.PI) * Math.asin(Math.sin(angFrec * x + step));
            points.push(y);
        }

        return points
    }

    generateSawToothWave(length,step){
        let points = [];
        let y;
        let angFrec = (this.frequency * 2 * Math.PI) / length;

        for(let x=0; x<length; x++){
            y = (this.amplitude * (0.5 - (1/Math.PI))) * (Math.pow(-1,x) * ( (Math.sin(angFrec * x + step))/ x ));
            points.push(y);
        }

        return points;
    }

    //adds the waves passed attending to its waveform
    //returns the points of the resulting wave
    static addWaves(waves,length,step){
        if(!Array.isArray(waves) || waves.length == 0){
            return false;
        }

        if(waves.length == 1){
            return waves[0].calculatePoints(length,step);
        }

        let points = waves[0].calculatePoints(length,step);
        for(let i=1;i<waves.length;i++){
            let temp = waves[i].calculatePoints(length,step);
            points = points.map((item, index)=>{
                return item + temp[index];
            });
        }
        return points
    }

    getPeriod(){
        return 1/this.frequency;
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

    getForm(){
        return this.form;
    }

    setForm(nForm){
        let validValues = ["sine","square","triangle"];
        if(!validValues.includes(nForm)){
            return false;
        }else{
            this.form = nForm;
        }
    }
}

