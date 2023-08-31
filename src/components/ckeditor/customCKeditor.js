import Editor from '@quangtrong1506/ckeditor-custom/build/ckeditor';
import { CKEditor } from '@ckeditor/ckeditor5-react';
// import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

export default function CustomCKeditor({ data, handleData = () => {} }) {
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
