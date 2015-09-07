# SCSS Bezier animations

[Demo](http://rolfvandekrol.github.io/scss-bezier-animations/)

## Bézier Curves

CSS allows you to use self defined cubic Bézier curves for transition timing
functions. A cubic Bézier curve is a bezier curve that is defined by 4 points or
a cubic polynominal equation. 

CSS Bézier functions are cubic Bézier functions, of with the `P_0` and `P_3` are
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
completely straighforward. As long as the duration and length in pixels of the
animation matches, everything works out just fine, but if you want to let one
animation run for a segment of another animation, it starts to cause problems.

Luckily there are algorithms available to manipulate Bézier curves. The 
algorithm we are going to use is De Casteljau's Algorithm, which is used to
split a curve in two curves at a certain point. Furthermore we use the Bernstein
polynomial form of Bézier curves to find out at which point the curse should be
split.

## Installation

```bash
npm install
```

## Running

```bash
gulp watch
```

Open `index.html` in your browser and admire the effect. :smile:
