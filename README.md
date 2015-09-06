# SCSS Bezier animations

## Bezier curves

CSS allows you to use self defined cubic bezier curves for transition timing
functions. A cubic bezier curve is a bezier curve that is defined by 4 points or
a cubic polynominal equation. 

CSS bezier functions are cubic bezier functions, of with the `P_0` and `P_3` are
already fixed on `(0, 0)` and `(1, 1)`. You can specify the `P_1` and `P_3` like
this:

```css
cubic-bezier(P_1_x, P_1_y, P_2_x, P_2_y)
```

The default `ease` function is defined as:

```
cubic-bezier(0.25, 0.1, 0.25, 1.0)
```

Because the animation is not linear, combining two easing animations is not 
completely straighforward.

## Installation

```bash
npm install
```

## Running

```bash
gulp watch
```

Open `index.html` in your browser and admire the effect. :smile:
