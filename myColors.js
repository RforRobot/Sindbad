// TODO: refactor using this example: 
// const rgbPixel = { r: 255, g: 0, b: 0 }; // Red

class Color {

    r;
    g;
    b;

    constructor(colorStr) {
        switch (colorStr) {
            case 'black':
                this.r = 0;
                this.g = 0;
                this.b = 0;
            break;
            case 'red':
                this.r = 200;
                this.g = 0;
                this.b = 0;
            break;
            case 'green':
                this.r = 0;
                this.g = 128;
                this.b = 0;
            break;
            case 'blue':
                this.r = 0;
                this.g = 0;
                this.b = 200;
            break;
            case 'pink':
                this.r = 248;
                this.g = 221;
                this.b = 189
            break;
            case 'yellow':
                this.r = 200;
                this.g = 200;
                this.b = 0;
            break;
            case 'gray':
                this.r = 150;
                this.g = 150;
                this.b = 150;
            break;
            case 'bgBrown':
                this.r = 193;
                this.g = 182;
                this.b = 41;
            break;
            default:
              console.log(`Invalid color ${colorStr} given.`);
          }

    }
}
