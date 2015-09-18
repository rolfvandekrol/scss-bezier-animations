
## 1. Introduction

* CSS animaties
* Timing
* Wiskunde
* Weekendproject (laten zien, trots)

## 2. Transitions

* Technische naam voor animaties in CSS, of in elk geval de vorm die wij het meest gebruiken

## 3. Voorbeelden

### 3.1. 

* Simpel voorbeeld
* Vlakje op `0px` dat in `3s` naar `900px` gaat.

### 3.2.

* Twee vlakjes, die exact dezelfde beweging maken

### 3.3.

* Twee vlakjes
* Het eerste vlakje maakt dezelfde beweging als in de vorige slide
* Het twee vlakje gaat in `1s` naar `300px`. Dus in een derde van de tijd, naar een derde van de afstand.
* En dat loopt dus niet precies gelijk.
* Hoe komt dat? Doordat de animatie niet helemaal recht verloopt. Hij begint langzaam, komt snel op gang, en remt dan langzaam weer af.
* Easing

### 3.4.

* We hebben ook lineare animaties. Die lopen dus wel recht

### 3.5.

* En als je die op dezelfde manier naast elkaar zet, dan lopen de blokjes wel synchroon.

### 3.6.

* Sneller
* Lelijk, hoekig

### 3.7.

* Met een easing curve, veel mooier

## 4. Bézier curves

### 4.1 Titel

* Gewenste effect => rekenen
* Wiskunde, moderne wiskunde
* Wiskundige term voor de beweging die de easing curve maakt
* Pierre Bézier (1910 - 1999) - Franse engineer bij Renault. Niet de uitvinder. Heeft er veel over gepubliceerd rond 1962.
* De uitvinder (1959) was Paul de Casteljau (1930) - Natuurkundige en Wiskundige. Werkte bij Citroën.

### 4.2 Graph

* Laten zien
* Wiskunde is het leukst als het zichtbaar is. Daar zit um ook gelijk de lol aan wiskunde. De beelden achter die 'saaie' formules zien.

Stappen in de grafiek

1. Lege grafiek
2. Curve
   * duration
   * progression
3. Punten
   * Volgorde
   * Vertrek uit P0, in de richting van P1, buigt af naar P2 en komt bij P3 aan uit de richting van P2.
4. Curve weg
   * Punten vormen de input van de Bezier curve, dus hoe kunnen we de curve opbouwen uit de punten?
5. Lijnen tussen de punten
   * Bézier polygoon
6. 1e orde punten
   * Punten op de lijn, steeds op `t`. 
   * Interne parameter `t`
   * Lijnen zijn eigenlijk ook Bézier curves, 1e orde
7. Lijnen tussen 1e orde punten
8. 2e orde punten
   * Ook weer op `t`.
   * 2e orde Bézier curve
9. Lijn tussen 2e orde punten
10. 3e orde punt
   * Op `t`
   * 3e orde Bézier curve
   * Volgt precies de curve
11. Curve

### 4.3 De Casteljau algoritme

* Formele wiskundige uitwerking van de tekening van vorige slide
* Recursief
* j = orde
* i = 0 & j = 3

### 4.4 De Casteljau uitwerking
* j = 0 t.m. j = 3
* j = 0 => Basispunten
* verder steeds halverwege

### 4.5 De Casteljau splitsen

1. Curve
2. Splitsen, hoe kunnen we dat doen?
3. Punten en polygonen weer terug
4. Punten kleuren per orde
5. Stilstaan. Eerste punten van elke orde, laatste puntent van elke orde

## 5 Bernstein

### 5.1 Bernstein polynomen

* Sergei Natanovich Bernstein (1880 - 1968), Geboren in Odessa, in wat nu Oekraïne heet, maar destijds bij het Russische Keizerrijk hoorde. Overleden in Moskou.
* Wiskunde uit 1912. Bij de ontwikkeling was deze toepassing nog niet bekend. Die is pas een halve eeuw later ontwikkeld.

### 5.2 Wiskundige definitie in Bezier curves

Generieke en uitgewerkt.

* Lineare combinatie van de orde 0 punten.
* b_v,n is een Bernstein basispolynoom
* Logisch nadenken `b_0,3(0) = 1`, `b_0,3(1) = 0`, `b_3,3(0) = 0`, `b_3,3(1) = 1`, `b_1,3(0) = 0`, `b_1,3(1) = 0`, `b_2,3(0) = 0`, `b_2,3(1) = 0`.

### 5.3 Grafiek van 3e orde Bernstein basis polynomen

### 5.4 Bernstein basis polynoom formule

Generiek en uitgewerkt

### 5.5 Bernstein polynoomcombinatie uitgewerkt

B(t) uitgewerkt en Bx/y(t)

Wijzen op 3e macht

## 6 Polynomen oplossen

* 3e graads functie
* 2e graads vergelijking
* Oplossing 2e graads vergelijking
* 3e graads polynomen grafieken
* 3e graads vergelijking
* 3e graads vergelijking vereenvoudigen
* 3e graads vereenvoudigde vergelijking oplossen (skimmen)

## 7 Combineren

We kunnen nu de vergelijking By(t0) = y0 oplossen. Dus dan weten we t0 bij een bepaalde afgelegde afstand. Daaruit kunnen we uitrekenen wat de duration was, met De Casteljau of Bernstein.
En we weten hoe we een curve moeten splitsen op t0 en wat dan de bovenste en onderste curve zijn.

## 8 CSS Bézier curves

### 8.1 intro

### Gesplitste curve

-> normalizeren


## 9 Resultaat

### 9.1 CSS

### 9.2 SCSS

## 10 Toepassing

cmd tab

## 11 Thanks

Questions?

Thanks