import { Form, Input, Button, Space, Tag, message, Alert } from "antd";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import {
  useCreateArticleMutation,
  useUpdateArticleMutation,
} from "../../../api/blogApi";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import ErrorAlert from "../../common/ErrorAlert";
import Spinner from "../../common/Spinner";
import styles from "./PostEditor.module.css";

const PostEditor = ({ initialData }) => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const { slug } = useParams();
  const { user } = useSelector((state) => state.auth);
  const [createArticle, { error: createError, isLoading: isCreating }] =
    useCreateArticleMutation();
  const [updateArticle, { error: updateError, isLoading: isUpdating }] =
    useUpdateArticleMutation();

  const isEditing = !!initialData || !!slug;
  const error = isEditing ? updateError : createError;
  const isLoading = isCreating || isUpdating;

  useEffect(() => {
    if (initialData) {
      form.setFieldsValue({
        title: initialData.title,
        description: initialData.description,
        body: initialData.body,
        tags: initialData.tagList?.length ? [...initialData.tagList, ""] : [""],
      });
    }
  }, [initialData, form]);

  const onFinish = async (values) => {
    try {
      const articleData = {
        title: values.title,
        description: values.description,
        body: values.body,
        tagList: values.tags.filter((tag) => tag.trim() !== ""),
      };

      if (isEditing) {
        const articleSlug = slug || initialData.slug;
        await updateArticle({
          slug: articleSlug,
          article: articleData,
        }).unwrap();
        message.success("Article updated successfully");
        navigate(`/post/${articleSlug}`);
      } else {
        const result = await createArticle(articleData).unwrap();
        message.success("Article created successfully");
        navigate(`/post/${result.article.slug}`);
      }
    } catch (err) {
      message.error(err.data?.errors?.message || "Failed to save article");
    }
  };

  const validateContent = (_, value) => {
    if (!value || value.trim().length < 10) {
      return Promise.reject(
        new Error("Content must be at least 10 characters"),
      );
    }
    return Promise.resolve();
  };

  if (isLoading) return <Spinner />;

  return (
    <div className={styles.editorContainer}>
      {error && <ErrorAlert error={error} className={styles.errorAlert} />}

      <Form
        form={form}
        layout="vertical"
        initialValues={{
          title: "",
          description: "",
          body: "",
          tags: [""],
        }}
        onFinish={onFinish}
      >
        <Form.Item
          name="title"
          label="Title"
          rules={[
            { required: true, message: "Please input title!" },
            { min: 3, message: "Title must be at least 3 characters" },
            { max: 100, message: "Title must be less than 100 characters" },
          ]}
        >
          <Input placeholder="Article title" />
        </Form.Item>

        <Form.Item
          name="description"
          label="Description"
          rules={[
            { required: true, message: "Please input description!" },
            { min: 10, message: "Description must be at least 10 characters" },
            {
              max: 200,
              message: "Description must be less than 200 characters",
            },
          ]}
        >
          <Input placeholder="What's this article about?" />
        </Form.Item>

        <Form.Item
          name="body"
          label="Content"
          rules={[
            { required: true, message: "Please input content!" },
            { validator: validateContent },
          ]}
        >
          <Input.TextArea
            rows={12}
            placeholder="Write your article (in markdown)"
            showCount
            maxLength={5000}
          />
        </Form.Item>

        <Form.Item label="Tags">
          <Form.List name="tags">
            {(fields, { add, remove }) => (
              <>
                {fields.map(({ key, name, ...restField }) => (
                  <Space key={key} align="baseline" className={styles.tagField}>
                    <Form.Item
                      {...restField}
                      name={name}
                      rules={[
                        {
                          max: 20,
                          message: "Tag must be less than 20 characters",
                        },
                      ]}
                    >
                      <Input placeholder="Tag" />
                    </Form.Item>
                    {fields.length > 1 && (
                      <MinusCircleOutlined
                        onClick={() => remove(name)}
                        className={styles.removeTag}
                      />
                    )}
                  </Space>
                ))}
                <Button
                  type="dashed"
                  onClick={() => add("")}
                  block
                  icon={<PlusOutlined />}
                  className={styles.addTagButton}
                >
                  Add Tag
                </Button>
              </>
            )}
          </Form.List>
        </Form.Item>

        <Form.Item className={styles.submitButton}>
          <Button
            type="primary"
            htmlType="submit"
            size="large"
            loading={isLoading}
            disabled={isLoading}
          >
            {isEditing ? "Update Article" : "Publish Article"}
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default PostEditor;
