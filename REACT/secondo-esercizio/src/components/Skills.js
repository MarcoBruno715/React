import React from 'react';


function Skills() {
    const listaCompetenze = [
        "HTML", "CSS", "JavaScript", "React", "Node.js", "Express", "MongoDB"

    ];
// cicla per ogni competenze crea un elemento puntato 
    return (
                                //Quanti  <li> quanti sono i progetti
        <section>

            <h2>Competenze tecniche</h2>
            <ul>
                {listaCompetenze.map((competenza, index) => (    //.map 
                    <li key={index}>{competenza}</li>

                ))}
            </ul>
        </section>

    );
}

export default Skills;