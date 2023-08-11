import React, { useState } from 'react';
import { Form, Input, Button, message } from 'antd';
import axios from 'axios';

const InquireCustomer = () => {
    const [form] = Form.useForm();
    const [customerInfo, setCustomerInfo] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleInquire = async (values) => {
        setLoading(true);
        try {
            const headers = {
                'X-API-KEY': 'themostsecretkeyeverexisted'
            };

            const response = await axios.get(`http://localhost:8080/api/customer/inquire/${values.customerId}`, { headers });

            if (response.status === 200) {
                setCustomerInfo(response.data);
            } else {
                setCustomerInfo(null);
                message.error('Customer not found.');
            }
        } catch (error) {
            setCustomerInfo(null);
            message.error(error.response?.data.message || 'An error occurred while inquiring about the customer.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <h2>Inquire Customer</h2>
            <Form form={form} onFinish={handleInquire}>
                <Form.Item name="customerId" label="Customer ID" rules={[{ required: true }]}>
                    <Input />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit" loading={loading}>
                        Inquire Customer
                    </Button>
                </Form.Item>
            </Form>
            {customerInfo && (
                <div>
                    <p>Customer ID: {customerInfo.id}</p>
                    <p>Name: {customerInfo.name}</p>
                    <p>Document Number: {customerInfo.documentNumber}</p>
                    <p>Document Type ID: {customerInfo.documentTypeId}</p>
                    {/* Additional customer details */}
                </div>
            )}
        </div>
    );
};

export default InquireCustomer;
