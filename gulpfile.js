'use strict';

/*Assignation des packages à des variables*/

const   gulp            = require('gulp'),
        sass            = require('gulp-sass'),
        concat          = require('gulp-concat'),
        autoprefixer    = require('gulp-autoprefixer'),
        rename          = require('gulp-rename'),
        notify          = require('gulp-notify'),
        browserSync     = require('browser-sync');


        /* Compilation des fichiers sass/scss */
        /* Commande == gulp build-sass */

gulp.task('build-sass', () => {
    /* Fichier compilé */
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


gulp.task('browserSync', function(){
    /*Lance un serveur web*/ 
    browserSync({
        server: {
            /*L'endroit où se situe notre index.html*/
            baseDir: './'
        },
    })
});

    /* Live production */
gulp.task('live-build',['browserSync','build-sass'], () => {
    /* Compilation des fichiers de prods à la sauvegarde */
    gulp.watch('src/sass/*', ['build-sass']);
    /* relancement du live-viewer à chaque sauvegarde d'un fichier */
    gulp.watch('dist/**/*', browserSync.reload);
    gulp.watch('index.html', browserSync.reload);
    gulp.watch('assets/**/*', browserSync.reload);
});