// import  Editor from './ckeditor-custom/build/ckeditor';
const Editor = require('./ckeditor-custom/build/ckeditor');
import { CKEditor } from '@ckeditor/ckeditor5-react';
export default function CustomCKeditor({ data, handleData = () => {} }) {
    console.log(Editor);
    console.log(Editor.default);
    return (
        <>
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
