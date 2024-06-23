import { scale, sum, v3 } from './vector';

export class Line {
    constructor(public start: v3, public direction: v3) {}
    getPointOfIntersection(t: number) {
        return sum(this.start, scale(this.direction, t))
    }

    /**
     * 
     * @param min Min point of the bounding box, AKA Top Left
     * @param max Max point of the bounding box, AKA Bottom Right
     */
    getBorderPointsInBoundingCube(min: v3, max: v3) {
        const [startx, starty, startz] = this.start
        const [dirx, diry, dirz] = this.direction
        const [minx, miny, minz] = min
        const [maxx, maxy, maxz] = max
        const leftT = (minx - startx) / dirx
        const topT = (miny - starty) / diry
        const frontT = (minz - startz) / dirz
        const rightT = (maxx - startx) / dirx
        const bottomT = (maxy - starty) / diry
        const backT = (maxz - startz) / dirz
        const out = [leftT, topT, rightT, bottomT, frontT, backT]
        // This won't work when the starting point is outside of the cube
        const positive = Math.min(...out.filter(n => n > 0))
        const negative = Math.max(...out.filter(n => n < 0))
        return [this.getPointOfIntersection(positive), this.getPointOfIntersection(negative)]
    }
}