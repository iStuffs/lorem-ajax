# Lorem ajax

## Objectif

L'objectif est de faire en sorte qu'il n'y ai pas besoin de recharger la page lorsque l'on utilise le menu vers les différentes alternatives de lorem. L'intéret est de faire un appel ajax de la page nécessaire et de mettre à jour uniquement la partie centrale de la page.

## Structure

```
dist/
├── ...
├── parts/
│   ├── bacon.php
│   ├── lorem.php
│   ├── riker.php
│   ├── samuell.php
│   └── cat.php
├── bacon.html
├── cat.html
├── index.html
├── riker.html
└── samuell.html
```

Les fichiers `.html` représentent des fichiers complets (ils sont utilses pour des raison de référencement). Les fichiers `.php` représentent la partie à dynamiser.
Utilisez les fichiers qui vous semblent les plus appropriés.

### liens utiles

[$.get('_url_').done(function(data){}).fail()](https://api.jquery.com/jquery.get/)

[$('_selector where to load_').load('_url_ _selector_to_filter_result_')](https://api.jquery.com/load/)
