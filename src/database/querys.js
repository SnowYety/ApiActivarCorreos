export const querys ={
    anioActivos:"SELECT DISTINCT AC.ACADEMIC_YEAR AS anio FROM ACADEMICCALENDAR AC ORDER BY AC.ACADEMIC_YEAR DESC",
    periodosActivos:"SELECT DISTINCT AC.ACADEMIC_TERM AS periodo FROM ACADEMICCALENDAR AC WHERE AC.ACADEMIC_YEAR=@anio ORDER BY AC.ACADEMIC_TERM",
    sessionActivas:"SELECT DISTINCT AC.ACADEMIC_SESSION AS IdSession,ACS.LONG_DESC AS session FROM ACADEMICCALENDAR AC INNER JOIN CODE_ACASESSION ACS ON ACS.CODE_VALUE_KEY=AC.ACADEMIC_SESSION WHERE AC.ACADEMIC_YEAR=@anio AND AC.ACADEMIC_TERM=@periodo ORDER BY AC.ACADEMIC_SESSION DESC",
    getAlumnos:"SELECT  "+
    "A.PEOPLE_ID AS matricula, "+
    "P.PersonId AS personId, "+
    "ISNULL(P.FIRST_NAME,'') AS nombre, "+
    "ISNULL(P.MIDDLE_NAME,'') AS segundoNombre , "+
    "ISNULL(P.LAST_NAME,'') AS apellidoPaterno, "+
    "ISNULL(P.Last_Name_Prefix,'') AS apellidoMaterno "+
    "FROM ACADEMIC A "+
    "INNER JOIN PEOPLE P ON P.PEOPLE_ID=A.PEOPLE_ID "+
    "WHERE A.ACADEMIC_YEAR=@anio AND A.ACADEMIC_TERM=@periodo",
    datosPersona:"SELECT  "+
    "P.PEOPLE_ID AS matricula, "+
    "P.PersonId AS personId, "+
    "P.FIRST_NAME AS nombre, "+
    "P.MIDDLE_NAME AS segundoNombre , "+
    "P.LAST_NAME AS apellidoPaterno, "+
    "P.Last_Name_Prefix AS apellidoMaterno "+
    "FROM PEOPLE P WHERE P.PEOPLE_ID=@matricula ",
    getCorreos:"SELECT EM.EmailAddressId AS id,EM.Email AS correo,EM.IsActive AS status FROM EmailAddress EM WHERE EM.PeopleOrgId=@matricula ORDER BY EM.CREATE_DATE DESC",
    getTelefonos:"SELECT PH.PersonPhoneId AS id, PH.PhoneNumber AS telefono FROM PersonPhone PH WHERE PH.PersonId=@personId ",
    getTutoresAlumno:"SELECT P.PEOPLE_ID AS matricula FROM RELATIONSHIP R "+
    "INNER JOIN PEOPLE P ON P.PEOPLE_CODE_ID=R.RELATION_CODE_ID "+
    "WHERE R.PEOPLE_ID=@matricula",
    updateStatusCorreo:"UPDATE EmailAddress SET IsActive=@status WHERE EmailAddressId=@id",
    user:"SELECT userName as usario, password  FROM Usuarios where userName=@usuario",
    fecha:"SELECT * FROM FechaLimite",
    updateFecha:"UPDATE FechaLimite SET FechaLimite=@fecha, dias=@dias"
}