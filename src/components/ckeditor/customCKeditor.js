// import  Editor from './ckeditor-custom/build/ckeditor';
const Editor = require('./ckeditor-custom/build/ckeditor');
import { CKEditor } from '@ckeditor/ckeditor5-react';
import { useEffect } from 'react';
export default function CustomCKeditor({ data, handleData = () => {} }) {
    console.log(Editor);
    console.log(Editor.default);
    useEffect(() => {
        Editor.create(document.querySelector('#editor')).catch((error) => {
            console.error(error);
        });
    }, []);
    return (
        <>
            <div id="editor">hi</div>
            <CKEditor
                editor={Editor}
                data={data}
                onReady={(editor) => {
                    handleData(editor.data.get());
                }}
                onChange={(event, editor) => {
                    handleData(editor.data.get());
                }}
            />
        </>
    );
}
