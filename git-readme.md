##comandos GIT------------------------------------------------------------------------------
-git add .  --- pasa todos los archivos al staging
-git commit -m "comments" --hace un commit de los archivos en el staged
    * utilizar en los comentarios [FIX] para correcciones y [IMP] para nuevas impemeplataciones
    * ejemplo git commit -m "[IMP] crud_position"
-git checkout -- permite cambiar de rama o de version de commit (no se recomienda navegar entre versiones de commits)
-git checkout -b brachname -- permite crear una nueva rama y cambiarte a ella
-git push origin branchname -- permite subir los cambios a github en una nueva rama
-git pull origin branchname -- permite descargar los cambios de una rama (en nuestro flujo se debe hacer el pull a development)
-git log --oneline -- permite ver el log de los commits realizados
-git branch -d branchname -- elimina la rama
##----------------------------------------------------------------------------------------

Pasos para utilizar github----------------------------------------------------------------
1-Clonar el repositorio 
git clone 'URL del repositorio'
## Despues de clonar el repositorio ejecutar npm install 
## importante tener installado sequelize-cli global, caso contrario instalarlo
2-Cambiarse a la rama development - NO HACER NINGUN CAMBIO EN LOS ARCHIVOS ESTANDO EN LA RAMA DEVELOPMENT
git check out development
3-Hace un pull de development para actualizar la rama - NO HACER NINGUN CAMBIO EN LOS ARCHIVOS ESTANDO EN LA RAMA DEVELOPMENT
git pull origin development
4-Crear la nueva rama para trabajar tu issue asignamos
git check out -b branchname  -- El branchname debe tener la siguiente estructura nombreissue#numerodeissue_pr - AHORA PUEDES MODIFICAR ARCHIVOS
5-una vez terminados el issue hacer un push a la rama
git push origin branchname
6-realizar el pull request en github y esperar la aprovacion
7-una vez que se apruebe el el pull request regresar a la rama development y bajar los cambios
git checkout development
git pull origin development
8-ahora tu rama development esta actualizada - NO HACER NINGUN CAMBIO EN LOS ARCHIVOS ESTANDO EN LA RAMA DEVELOPMENT
9-puedes borrar la rama en la que trabajaste el issue anterior
git branch -d branchname
10- para trabajar en un nuevo issue recuerda siempre hacer una nueva rama (paso 4).En caso de haber hecho cambios sin haber cambiado de rama favor de no realizar los commits
##-------------------------------------------------------------------------------------------------------------