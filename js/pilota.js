export class Pilota {
    constructor(x, y, velX, velY, color, mida) {
        this.x = x;
        this.y = y;
        this.velX = velX;
        this.velY = velY;
        this.color = color;
        this.mida = mida;
    }

    dibuixa(ctx) {
        ctx.beginPath(); // Per començar a dibuixar formes al canvas
        ctx.fillStyle = this.color; //Color amb que dibuixarem
        ctx.arc(this.x, this.y, this.mida, 0, 2 * Math.PI); //Dibuix d’un arc
        ctx.fill(); // Finalitza el dibuix i l’omple amb el color ja esmenat
    }

    mou(width, height) {
        if (this.x + this.mida > width || this.x - this.mida < 0) {
            this.velX = -this.velX; // Reverse the X velocity to bounce
        }

        if (this.y + this.mida > height || this.y - this.mida < 0) {
            this.velY = -this.velY; // Reverse the Y velocity to bounce
        }
        this.x += this.velX;
        this.y += this.velY;
    }

    coloisiona(pilota) {
        // Calcula la distancia entre los centros de las bolas
        let h = Math.sqrt(Math.pow((this.x - pilota.x), 2) + Math.pow((this.y - pilota.y), 2))
        if (this.mida + pilota.mida > h) {
            // Las bolas están colisionando
            // pilota.color = `rgb(${Math.floor(Math.random() * (255 - 0) + 0)},${Math.floor(Math.random() * (255 - 0) + 0)},${Math.floor(Math.random() * (255 - 0) + 0)})`;
            // this.color = `rgb(${Math.floor(Math.random() * (255 - 0) + 0)},${Math.floor(Math.random() * (255 - 0) + 0)},${Math.floor(Math.random() * (255 - 0) + 0)})`;

            // Calcula las diferencias en las coordenadas x e y entre las dos bolas
            let dx = pilota.x - this.x;
            let dy = pilota.y - this.y;

            // Calcula el ángulo de la colisión
            let angle = Math.atan2(dy, dx);
            // Calcula seno y coseno del ángulo
            let sin = Math.sin(angle);
            let cos = Math.cos(angle);


            // Rotación de las velocidades de las bolas
            let velX1 = this.velX * cos + this.velY * sin;
            let velY1 = this.velY * cos - this.velX * sin;
            let velX2 = pilota.velX * cos + pilota.velY * sin;
            let velY2 = pilota.velY * cos - pilota.velX * sin;

            // Intercambia las velocidades (colisión elástica)
            let finalVelX1 = velX2;
            let finalVelX2 = velX1;

            // Rotación inversa de las velocidades
            this.velX = finalVelX1 * cos - velY1 * sin;
            this.velY = velY1 * cos + finalVelX1 * sin;
            pilota.velX = finalVelX2 * cos - velY2 * sin;
            pilota.velY = velY2 * cos + finalVelX2 * sin;

            // Mueve las bolas para evitar que queden pegadas después de la colisión
            this.x += this.velX;
            this.y += this.velY;
            pilota.x += pilota.velX;
            pilota.y += pilota.velY;
        }
    }

}