import React, { useState, useEffect } from 'react';
import { Form, Input, Button, message, Select } from 'antd';
import axios from 'axios';
import { getDocumentTypes } from './getDocumentTypes'; // Adjust the path accordingly

const CreateCustomer = () => {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const [documentTypes, setDocumentTypes] = useState([]);
    const [selectedDocumentType, setSelectedDocumentType] = useState(null);

    useEffect(() => {
        fetchDocumentTypes();
    }, []);

    const fetchDocumentTypes = async () => {
        const types = await getDocumentTypes();
        setDocumentTypes(types);
    };

    const handleDocumentTypeChange = (value) => {
        setSelectedDocumentType(value);
    };

    const handleSubmit = async (values) => {
        setLoading(true);
        try {
            const headers = {
                'X-API-KEY': 'themostsecretkeyeverexisted'
            };

            await axios.post('http://localhost:8080/api/customer/create', values, { headers });
            message.success('Customer created successfully.');
            form.resetFields();
        } catch (error) {
            message.error(error.response?.data.message || 'Failed to create customer.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <h2>Create Customer</h2>
            <Form form={form} onFinish={handleSubmit}>
                <Form.Item
                    name="name"
                    label="Name"
                    rules={[
                        { required: true, message: 'Name is required' },
                        { max: 255, message: 'Name can\'t exceed 255 characters' }
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="documentNumber"
                    label={`${selectedDocumentType === 2 ? 'Passport' : 'Identification'} Number`} // Update the label dynamically
                    rules={[
                        { required: true, message: 'Document number is required' },
                        { max: 50, message: 'Document number can\'t exceed 50 characters' }
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="documentTypeId"
                    label="Document Type"
                    rules={[
                        { required: true, message: 'Document type is required' }
                    ]}
                >
                    <Select onChange={handleDocumentTypeChange}>
                        {documentTypes.map(type => (
                            <Select.Option key={type.id} value={type.id}>
                                {type.name}
                            </Select.Option>
                        ))}
                    </Select>
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit" loading={loading}>
                        Create Customer
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default CreateCustomer;
