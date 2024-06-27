export type v3 = [number, number, number]

export const v3 = (x = 0, y = 0, z = 0) => [x,y,z] as v3

export const ZERO = v3()

export const sum = (a: v3, b: v3) => {
    const [a1, a2, a3] = a
    const [b1, b2, b3] = b
    return v3(a1 + b1, a2 + b2, a3 + b3)
}

export const sub = (a: v3, b: v3) => {
    const [a1, a2, a3] = a
    const [b1, b2, b3] = b
    return v3(a1 - b1, a2 - b2, a3 - b3)
}

export const multiply = (a: v3, b: v3) => {
    const [a1, a2, a3] = a
    const [b1, b2, b3] = b
    return v3(a1 * b1, a2 * b2, a3 * b3)
}

export const divide = (a: v3, b: v3) => {
    const [a1, a2, a3] = a
    const [b1, b2, b3] = b
    return v3(a1 / b1, a2 / b2, a3 / b3)
}

export const scale = (v: v3, scalar: number) => {
    const [a1, a2, a3] = v
    return v3(a1 * scalar, a2 * scalar, a3 * scalar)
}

export const dot = (a: v3, b: v3) => {
    const [a1, a2, a3] = a
    const [b1, b2, b3] = b
    return a1 * b1 + a2 * b2 + a3 * b3
}

export const length = (v: v3) => {
    const [a1, a2, a3] = v
    return Math.sqrt(a1 * a1 + a2 * a2 + a3 * a3)
}

export const normalize = (v: v3) => scale(v, 1/length(v)) // I think we lose more precision here than if we used a division

// TODO: Figure out how to make this work in 3d after implementing cross products
export const perpendicular = (v: v3) => v3(-v[1], v[0])

export const angle = (a: v3, b: v3) =>
    Math.acos(dot(a, b) / (length(a) * length(b)))

export const clone = (v: v3) => v3(v[0], v[1], v[2])

const piNum = Math.PI / 180
const numPi = 180 / Math.PI
export const degToRad = (n: number) => n * piNum
export const radToDeg = (rad: number) => rad * numPi
