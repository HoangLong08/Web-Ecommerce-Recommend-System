import { Button } from 'antd'
import React from 'react'
import { useNavigate } from 'react-router-dom';
import './style.css'

function NotFound() {
	const navigate = useNavigate();
	return (
		<div className='wrapper-not-found'>
			<h1>404</h1>
			<p>Không tìm thấy nội dung</p>
			<Button type='primary' onClick={() => { navigate(-1) }}>Quay lại trang chủ</Button>
		</div>
	)
}

export default NotFound