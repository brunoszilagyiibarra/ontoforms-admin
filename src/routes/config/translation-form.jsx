import {useState} from 'react';
import {addOntoTranslation} from "../../client/ontoforms-api-client";

export default function TranslationForm({ontoId}) {
    const [formData, setFormData] = useState({
        uri: "",
        translate: "",
    });

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmitTranslation = (event) => {
        addOntoTranslation(ontoId, formData.uri, formData.translate)
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
            <label>Ingrese traducción:
                <input
                    type="text"
                    name="translate"
                    value={formData.translate}
                    onChange={handleInputChange}
                />
            </label>
            <input type="submit" />
        </form>
    )
}