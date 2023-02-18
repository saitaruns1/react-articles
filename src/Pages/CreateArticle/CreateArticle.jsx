import React, { useEffect, useState } from 'react';
import { Field, FormikProvider, useFormik } from 'formik';
import InputBox from '../../components/InputBox/InputBox';
import './style.css'
import { API_URL } from '../../Authservice';
import axios from 'axios';
import authHeader from '../../Authheader';
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { convertToHTML } from 'draft-convert';
import DOMPurify from 'dompurify';


const initialValues = {
    title: '',
    category: '',
    bio: '',
    text_content: '',
    user: '',
}

const onSubmit = (values) => {

    const user = JSON.parse(localStorage.getItem('user'));
    const reqBody = {
        title: values.title,
        category_name: values.category,
        description: values.bio,
        text_content: values.text_content,
        image_url:"",
        user_id: user.user.id,
    }
    axios.post(API_URL + '/article',reqBody ,{ headers: authHeader() },)
        .then((response) => console.log(response))
}

const validate = values => {
    const errors = {};

    if (!values.title) {
        errors.title = 'Required';
    }

    // if (!values.category) {
    //     errors.category = 'Required'
    // }
    if (!values.bio) {
        errors.bio = 'Required'
    }
    if (!values.text_content) {
        errors.text_content = 'Required'
    }
    // if (!values.user) {
    //     errors.user = 'Required'
    // }

    return errors;
};

function createMarkup(html) {
    return {
        __html: DOMPurify.sanitize(html)
    }
}

const CreateArticle = () => {

    const [categories, setCategories] = useState([])

    useEffect(() => {
        axios.get(API_URL + '/categories')
            .then((response) => {
                console.log(response.data)
                setCategories(response.data)
            })
    }, [])

    const formik = useFormik({
        initialValues,
        onSubmit,
        validate
    });
    const prepareDraft = (value) => {
        const draft = htmlToDraft(value);
        const contentState = ContentState.createFromBlockArray(draft.contentBlocks);
        const editorState = EditorState.createWithContent(contentState);
        return editorState;
    };

    const [editorState, setEditorState] = useState(formik.values.text_content ? prepareDraft(formik.values.text_content) : EditorState.createEmpty());
    const [convertedContent, setConvertedContent] = useState(null);

    useEffect(() => {
        const forFormik = draftToHtml(
            convertToRaw(editorState.getCurrentContent())
        );
        formik.setFieldValue("text_content", forFormik)
        setEditorState(editorState);
        let html = convertToHTML(editorState.getCurrentContent());
        setConvertedContent(html);
    }, [editorState]);

    return (<>
        <form className='article-form container' onSubmit={formik.handleSubmit}>
            <InputBox
                id="title"
                name="title"
                label="Title"
                type="text"
                placeholder="Enter your Title"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.title}
            />
            {formik.touched.title && formik.errors.title ? <div>{formik.errors.title}</div> : null}
            <InputBox
                id="bio"
                name="bio"
                label="Bio"
                type="text"
                placeholder="Enter your Bio"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.bio}
            />
            {formik.touched.bio && formik.errors.bio ? <div>{formik.errors.bio}</div> : null}
            <FormikProvider value={formik}>
                <Field
                    value={formik.values.category}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    name="category"
                    as="select">
                    <option value="" label="Select a category">
                        Select a category{" "}
                    </option>
                    {categories.map((cat) => {
                        return <option key={cat.id} value={cat.category_name}>{cat.category_name}</option>
                    })}
                </Field>
            </FormikProvider>
            {formik.touched.category && formik.errors.category ? <div>{formik.errors.category}</div> : null}
            <Editor
                editorState={editorState}
                onEditorStateChange={setEditorState}
                wrapperClassName="wrapper-class"
                editorClassName="editor-class"
                toolbarClassName="toolbar-class"
            />
            <div className="preview"
                dangerouslySetInnerHTML={createMarkup(convertedContent)}></div>
            <button type="submit">Submit</button>
        </form>
    </>
    );
};

export default CreateArticle