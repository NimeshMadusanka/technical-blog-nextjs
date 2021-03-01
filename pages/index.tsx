import Head from 'next/head'
import styles from '../styles/Home.module.scss'
import Link from 'next/link'


const { BLOG_URL, CONTENT_API_KEY } = process.env

type Post = {
	title: string
	slug: string
	feature_image: string
}

async function getPosts() {
	// curl ""
	const res = await fetch(
		`${BLOG_URL}/ghost/api/v3/content/posts/?key=${CONTENT_API_KEY}&fields=title,slug,feature_image,custom_excerpt`
	).then((res) => res.json())

	const posts = res.posts
	console.log(res);
	return posts
}

export const getStaticProps = async ({ params }) => {
	const posts = await getPosts()
	return {
		revalidate: 10,
		props: { posts }
	}
}

const Home: React.FC<{ posts: Post[] }> = (props) => {
	const { posts } = props

	return (
		<div >
			<h1 className={styles.blogt}>Technical Blog Site</h1>
			<ul>
				{posts.map((post, index) => {
					return (
							<div className={styles.responsive}>
							<div className={styles.gallery}>
								<div key={post.slug}>
									<div className={styles.desc} >
										<Link href="/post/[slug]" as={`/post/${post.slug}`}>
											<a>{post.title}<img src={post.feature_image}  ></img></a>
										</Link>
									</div>
								</div>


								</div>
							</div>
					)
				})}
			</ul>
		</div>
	)
}

export default Home
