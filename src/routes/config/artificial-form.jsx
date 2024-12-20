import {useState} from 'react';
import {addOntoArtificeclass} from "../../client/ontoforms-api-client";

export default function ArtificialForm({ontoId}) {
    const [formData, setFormData] = useState({
        uri: "",
    });

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmitTranslation = (event) => {
        addOntoArtificeclass(ontoId, formData.uri, formData.mainClassUri)
            .catch(error => console.log(error))
    }

    return (
        <form onSubmit={handleSubmitTranslation}>
            <label>Ingrese uri:
                <input
                    type="text"
                    name="uri"
                    value={formData.uri}
                    onChange={handleInputChange}
                />
            </label>
            <label>Ingrese Main Class uri:
                <input
                    type="text"
                    name="mainClassUri"
                    value={formData.mainClassUri}
                    onChange={handleInputChange}
                />
            </label>
            <input type="submit"/>
        </form>
    )
}