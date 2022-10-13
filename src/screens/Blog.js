
import './Blog.css'

export default function Blog(){
    return (
        <div className='main-content'>
            <Posts/>
        </div>
    )
}

function Posts(){
    const blogArticles = [
        {
            title: 'An analysis of quantum mechanics',
            content: "This is the first blog article! Many more to come! This blog will cover a lot of different topic like my leetcode practices universitary struggles and much more!"+
                "\n Passionate dev with passionate goals! *I* just want to test what happens when the maximum length of this paragraph gets filled. Is this then automatically wrapping to the next line?",
            date: "6th February 2022"
        },
        {
            title: 'Spring & React is interesting!',
            content: 'This article is about how i built this website! Cool Spring and React stuffs!',
            date: "5th February 2022"
        },
        {
            title: 'Parallel Programming in 2022',
            content: 'This article is about how i built this website! Cool Spring and React stuffs!',
            date: "1st February 2022"
        },
        {
            title: 'The second article',
            content: 'This article is about how i built this website! Cool Spring and React stuffs!',
            date: "30th January 2022"
        },
        {
            title: 'The second article',
            content: 'This article is about how i built this website! Cool Spring and React stuffs!',
            date: "20th January 2022"
        },
        {
            title: 'The second article',
            content: 'This article is about how i built this website! Cool Spring and React stuffs!',
            date: "10th January 2022"
        }
    ]

    return (
        <div className='posts-container'>
            {
                blogArticles.map((post, index) => <Post key={index} post={post}/>)
            }
        </div>
    )
}

function Post({post: {title, content,date}}){
    const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
    const vh  = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0);

    const containerClick = ({ target }) => { 
        if(target.className !== 'post-container'){
            return;
        }

        /*const tl = gsap.timeline();
        tl
        .to(target, {
            rotationY: 90,
            color: '#1f333e',
            borderColor: '#1f333e',
            duration: .25
        })
        .to(target, {
            rotationY: 180,
            duration: .25
        })
        .to(target, {
            y: vh/2 - target.getBoundingClientRect().y - target.getBoundingClientRect().height / 2, 
            scaleX: vw / target.clientWidth * 1.1,
            scaleY: vh / target.clientHeight * 1.1,
            zIndex: 1000,
            duration: .5
        })*/
    }

    return (
        <div className='post-container' onClick={containerClick}>
            <div className='heading-container'>
                <h1 className="heading">{title}</h1>
                <h2>{date}</h2>
            </div>
            <span>
                {content}
            </span>
        </div>
    )
}