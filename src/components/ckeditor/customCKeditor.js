import * as editor from './ckeditor-custom/build/ckeditor.js';
// const Editor = require('./ckeditor-custom/src/ckeditor');
import { CKEditor } from '@ckeditor/ckeditor5-react';
export default function CustomCKeditor({ data, handleData = () => {} }) {
    // console.log(Editor);
    // console.log(typeof Editor);
    return (
        <>
            <CKEditor
                editor={editor}
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
