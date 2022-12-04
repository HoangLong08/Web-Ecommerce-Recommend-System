import React from 'react'
import { Link } from 'react-router-dom'
import './style.css'

const footers = [
	{
		title: 'Hỗ trợ khách hàng',
		content: [
			{
				title: 'Thẻ ưu đãi',
				link: '/'
			},
			{
				title: 'Trung tâm bảo hành',
				link: '/'
			}
		]
	},
	{
		title: 'Chính sách mua hàng và bảo hành',
		content: [
			{
				title: 'Quy định chung',
				link: '/'
			},
			{
				title: 'Chính sách bảo mật thông tin',
				link: '/'
			},
			{
				title: 'Chính sách vận chuyển và lắp đặt',
				link: '/'
			},
			{
				title: 'Chính sách bảo hành',
				link: '/'
			},
			{
				title: 'Chính sách đổi trả hoàn tiền',
				link: '/'
			}
		]
	},
	{
		title: 'Thông tin công ty',
		content: [
			{
				title: 'Giới thiệu',
				link: '/'
			},
			{
				title: 'Thông tin liên hệ',
				link: '/'
			},
			{
				title: 'Hỏi đáp',
				link: '/'
			},
			{
				title: 'Tin công nghệ',
				link: '/'
			}
		]
	},
	{
		title: 'Cộng động',
		content: [
			{
				title: 'Gọi mua hàng 0999999',
				link: '/'
			},
			{
				title: 'Gọi chăm sóc 09999999',
				link: '/'
			}
		]
	},
	{
		title: 'Email liên hệ',
		content: [
			{
				title: 'Hỗ trợ khách hàng',
				link: '/'
			},
			{
				title: 'Gọi chăm sóc 09999999',
				link: '/'
			}
		]
	}
]

function Footer() {
	return (
		<footer className='wrapper-footer'>
			<div className='container'>
				<div className='footer-list-item'>
					{footers.map((itemMain, index) => {
						return (
							<div key={'footer-main-' + index}>
								<p className='footer-title-main'>{itemMain.title}</p>
								{itemMain.content.map((itemSub, indexSub) => {
									return (
										<Link to={itemSub.link} key={'footer-sub-' + indexSub}>
											<p className='footer-title-sub'>
												{itemSub.title}
											</p>
										</Link>
									)
								})}
							</div>
						)
					})}
				</div>
				<div className='ui-footer-copyright'>
					hoang long code
				</div>
			</div>
		</footer>
	)
}

export default Footer