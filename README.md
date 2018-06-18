# Cour sur Sass & Gulp
![SASS](https://i2.wp.com/teckstack.com/tsdir/wp-content/uploads/2015/12/sass-banner1.jpg?fit=768%2C323&ssl=1)
![Difficulté](https://img.shields.io/badge/Difficult%C3%A9-Facile-green.svg)
![Temps](https://img.shields.io/badge/Temps%20estim%C3%A9-1%20heure%2030%20minutes-686de0.svg)
![NodeJS](https://img.shields.io/badge/NodeJS-v8.10.0-6ab04c.svg)
![Gulp](https://img.shields.io/badge/Gulp-v3.9.1-ff7979.svg)

## Qu'est-ce que Sass ?
---

Sass est un language de style qui est destiné à la production,
les fichiers d'extension SASS ou SCSS ne peuvent être lus par un navigateur web,
pour cela, il faut compiler nos fichiers SASS/SCSS en CSS pour qu'ils puissent être lus.

Pour compiler les fichiers Sass/Scss, il y a une commande propre au language qui est disponnible,
mais dans ce cour nous allons apprendre à compiler tout ça avec des tâches Gulp !

## Qu'est-ce que Gulp ?
---

Gulp est un task runner c’est à dire qu’il effectue des tâches pour vous. Dans le développement web, vous l’utiliserez pour des tâches front-end telles que :

- créer un serveur web local
- rafraîchir le navigateur automatiquement à chaque fois qu’un fichier est modifié
- utiliser des préprocesseurs comme Sass ou LESS
- optimiser des ressources comme CSS, JavaScript et les images.

La liste est longue de ce que Gulp peut faire pour vous.

# Partie 1 : Clôner le dépôt

Ce dépôt est une template qui vas vous permettre d'exercer sur les outils du cour ( Si tout comme moi, créer une arborescence à chaque projets ça vous fait chier, on peut la considérer comme une template de Starter).

Nous allons commencer par clôner tout ça :

```bash
cd /Ou_vous_voulez/
``` 

# Partie 2 : Installation des près-requis

### NodeJS
Pour installer NodeJS allez sur ce lien :
- [NodeJS](https://nodejs.org/en/)


### Gulp
Une fois NodeJS installé, il va falloir installer gulp en global sur votre systeme avec cette commande :
```bash
npm i -g gulp
```
- Site officiel : [Gulp](https://gulpjs.com/)

# Partie 3 : Installation des dépendances dans le projet

Vous allez vous rendre dans la racine de votre projet avec le terminal,
puis vous allez entrer cette commande :
```bash
npm i
```
Cette commande va aller chercher dans le package.json les dépendances à installer.

## == ATTENTION ==
---

Dans le cadre du cour, le package.json existe déjà dans le projet,
mais en situation normale, vous devais faire 
```bash
npm init
```
puis installer les dépendances une par une.

## Dépendances installés :
---

Les dépendances installés pour ce cour sont :
```md
- Gulp
- Gulp-sass (Prè-processeur Sass)
- Gulp-concat (Permet de concaténer des fichiers)
- Gulp-autoprefixer (Permet d'ajouter les préfixes comme -webkit- à la compilation en CSS)
- Gulp-notify (Système de notification)
- Gulp-rename
- Browser-sync (Permet d'avoir un live de nos modifications dans notre navigateur préféré)
```

# Partie 4 : Description de l'arborescence
Voici quelques informations sur l'arborescence clonée :
```
|
|
|
`---- assets (img/fonts/etc...)
|    |
|    |
|    `---- img (Les images de notre site)
|    |
|    |
|    `---- fonts (Les typographies)
|
|
|
`---- dist (On y stock les JS/CSS)
|   |
|   |
|   `---- js (Nos fichiers JS)
|   |
|   |
|   `---- css (Nos fichiers css)
|
|
|
`---- node_modules (Contient les dépendances)
|
|
|
`---- src (Les fichiers sources)
|   |
|   |
|   `---- sass (contient les fichiers d'extension SASS)
|   |
|   |
|   `---- app.sass (Le fichier de compilation vers CSS)
|
|
|
`---- gulpfile.js (Fichier contenant les tâches Gulp)
|
|
|
`---- index.html
|
|
|
`---- package.json (Tableau des dépendances du projet)
```

# Partie 4 : Les commandes Gulp

Pour exécuter une tâche gulp, il faut : 

- un fichier gulpfile.js dans votre projet,
- avoir installé Gulp en global sur votre machine,
- avoir des tâches gulp à exécuter dans son fichier gulpfile.js (Ici je vous en ai fait trois)
- utiliser le préfixe `gulp`

## Première commande :
---

Ici je l'ai appelé `build-sass`, vous pouvez la nommer comme vous le voulez mais moi `build-sass` j'aime bien.
```JS
gulp.task('build-sass', () => {

    /* Fichier à compiler */
    return gulp.src(['src/app.sass'])

        /* affiche l'erreur en cas d'erreur */
        .pipe(sass().on('error', sass.logError))

        /* Créer un fichier style.css */
        .pipe(concat('style.css'))

        /* Ajoute les préfixes à la compilation */
        .pipe(autoprefixer())

        /* destination du style.css */
        .pipe(gulp.dest('dist/css'))

        /* rafraichissement de la page web */
        .pipe(browserSync.reload({
            stream: true
        }))

        /* notification */
        .pipe(notify(
            {
                title: "Compilation CSS",
                message: "Fichiers SASS et SCSS compilés avec succés"
            }
        ))
    });
```
Cette commande va tout simplement compiler vos fichier SASS en un fichier CSS, je l'ai commenté de sorte à ce que vous comprennez bien le principe.

Pour l'exécuter faites : 
```bash
gulp build-sass
```
dans la racine de votre projet biensur (mais pas maintenant on a rien fait encore)

## Deuxième commande :

---

```js
gulp.task('browserSync', function(){
    /*Lance un serveur web*/ 
    browserSync({
        server: {
            /*L'endroit où se situe notre index.html*/
            baseDir: './'
        },
    })
});
```
Cette commande permet de lancer un serveur web tout simplement :

```bash
gulp browserSync
```

## La commande ULTIME :

---

```js
gulp.task('live-build',['browserSync','build-sass'], () => {
    /* Compilation des fichiers de prods à la sauvegarde */
    gulp.watch('src/sass/*', ['build-sass']);
    /* relancement du live-viewer à chaque sauvegarde d'un fichier */
    gulp.watch('dist/**/*', browserSync.reload);
    gulp.watch('index.html', browserSync.reload);
    gulp.watch('assets/**/*', browserSync.reload);
});
```
Cette commande de 'Live building' permet plusieurs choses:

```js
gulp.task('live-build',['browserSync','build-sass'], () => {})
```
Quand nous appelons `gulp live-build`,
dans l'ordre il va exécuter `browserSync` puis `build-sass` et enfin, il va exécuter ses tâches :

- Lance la commande `build-sass` à chaque changement dans le dossier `src/sass/`, en gros, pour chaque sauvegarde d'un fichier dans le dossier `src/sass`, la compilation en CSS se feras automatiquement.

```js
gulp.watch('src/sass/*', ['build-sass']);
```

- Gulp va regarder les dossiers `dist` et `assets`, et aussi le fichier `index.html`, et pour chaque changement dans ces dossiers/fichiers, il va relancer l'aperçu dans le navigateur.

```js
    gulp.watch('dist/**/*', browserSync.reload);
    gulp.watch('index.html', browserSync.reload);
    gulp.watch('assets/**/*', browserSync.reload);
```

Pourquoi le dossier SASS n'est-il pas regardé ?

Chaque fois que la commande `build-sass` sera lancée (donc à chaque fois que l'ont compile), un fichier `style.css` sera mis à jour dans le dossier `dist/css`.

Donc regarder les changements dans le dossier `dist` est largement suffisant.

Pour lancer cette commande : 

```bash
gulp live-build
```
# PAUSE

# Partie 5 : Un peu de pratique

Dans un premier temps lancez la commande : 
```bash
gulp live-build
```
puis baissez votre terminal on en aura plus besoin.

Bon on va commencer doucement, dans un premier temps aller dans le fichier : `src/app.sass`.

On peut y remarquer ces lignes : 
```scss
@import "sass/variables.sass"
@import "sass/body.sass"
```
En faite, ce fichier vas importer les fichiers SASS du dossier `src/sass`,
pour ensuite les compiler (la commande build-sass compile CE fichier).

Le fichier variables, si vous en faites un, doit toujours être en premier,
exemple : **si les modification de `x.sass` dépendent de `y.sass`, `y.sass` doit être importé avant `x.sass`**.

## Les variables

---

Nous allons nous rendre dans le fichier `src/sass/variables.sass`.

Maintenant que vous y êtes, écrivez ces lignes :
```scss
$white: #eeeeee
$black: #222222

$white-d: darken($white, 20%)
$black-d: darken($black, 20%)

$white-l: lighten($white, 20%)
$black-d: lighten($black, 20%)
```
Vous venez de créer quatres variables contenant des couleurs !

## Modifions le style de notre site !

---

Rendons nous dans le fichier `src/sass/body.sass`, puis rentrons les lignes suivantes : 
```scss
body
    margin: 0
    padding: 0
    background-color: $white-d
```
En Sass, comme vous l'avez surement constaté, il n'y a pas de `{}` ni de `;`, le plus important c'est l'**indentation**.

Bon là vous avez appris à modifier le background de `body`, on va aller + loin :

## Création de vos propres fichier SASS

---

Créez dans `src/sass`, un fichier appelé `container.sass` et un autre appelé `content.sass`, puis dans le fichier `src/app.sass` entrez ces lignes à la suite des autres : 
```scss
@import "sass/container.sass"
@import "sass/content.sass"
```
Dans le `index.html`, entrez ces lignes : 
```html
<div class='container'>
    <div class='square'>
        <div class='circle'>
        </div>
    </div>
</div>
```
Puis dans vos fichiers `container.sass` et `content.sass`, ajoutez ces lignes (libre à vous de rajouter un background etc...) :

`container.sass`

```scss
.container
    height: 100vh
    width: 100vw
```

`content.sass`
```scss
.square
    height: 50px
    width: 50px
    background-color: $black-l

    .circle
        height: 50px
        width: 50px
        background-color: $white-d
        transition: background-color .3s
    
        &:hover
            background-color: $white-l
```

## Le préfixe '&'

---
En SASS, le préfixe `&` est égal au parent, exemple : 

- dans le block au dessus, au lieu de re-écrire `.circle:hover`, il nous suffit juste de mettre `&` au même niveau d'indentation que les paramêtres du parent que l'ont vise : ici, `&` = `.circle`.

# Partie 6 : Petites parenthèses de fin

### Pendant ce cour vous avez appris : 
- **Sass**
    - Qu'est-ce que c'est ?
    - Comment le compiler en CSS ?
    - Comment faire des variables ?
    - Les différences synthaxiale entre SASS et CSS ?
    - Une arborescence simple d'un projet avec SASS.

- **Gulp**
    - Qu'est-ce que c'est ?
    - Installation
    - Comment créer une tâche Gulp ?
    - Où écrire une tâche Gulp ?
    - Comment lancer une tâche Gulp ?

### Ce que vous n'avais pas appris :
- Le language SCSS, qui se compile de la même façon que SASS, qui s'utilise avec la même arborescence mais qui garde la synthaxe de CSS avec quelques variantes

- Les fonctions SCSS

- Minifier les fichiers JS avec Gulp 

Et **pleins d'autres choses** ! 

Je vous invite à en découvrir d'avantage sur ces outils qui boosterons votre vitesse de production et aussi (pour ma part), rend la partie de production plus agréable avec la simplicité de la synthaxe SASS.

# C'est FINI !!

### J'espère que ce cour vous aura était utile !

![Thank's !](http://www.djab.com/wp-content/uploads/2015/08/Thank-you-blue-banner.png)