import { db } from './firebase';
import { collection, doc, getDocs, getDoc, addDoc } from "firebase/firestore";

function displayData(data) {
    const parent = document.createElement("pre");
    const child = document.createElement("code");

    child.innerHTML = JSON.stringify(data, null, " ");
    child.classList.add("language-json");

    parent.appendChild(child);
    parent.classList.add("block");
    document.getElementById("data-list").appendChild(parent);
    hljs.highlightElement(child);
}

async function load() {
    const users = await getDocs(collection(db, "users"));

    users.forEach(async (user) => {
        const data = {
            user: {
                ...user.data(),
                posts: {},
                settings: {}
            }
        }

        const posts = await getDocs(collection(user.ref, "posts"));

        posts.forEach(async (post) => {
            data.user.posts[post.id] = {
                ...post.data(),
                comments: {}
            }

            const comments = await getDocs(collection(post.ref, "comments"));

            comments.forEach((comment) => {
                data.user.posts[post.id].comments[comment.id] = {
                    content: comment.data().content,
                    user: comment.data().user.id
                }
            });
        })

        const settings = await getDocs(collection(user.ref, "settings"));

        settings.forEach((setting) => {
            data.user.settings[setting.id] = { ...setting.data() }
        })

        displayData(data);
    });
}

async function addPost() {
    const text = document.getElementById("post-new-text").value

    if (text.length > 0) {
        const user = doc(db, "users", "BYZ5WjxJwlB8Igmv35Vo");
        const userSnapshot = await getDoc(user);
        
        if (userSnapshot.exists()) {
            await addDoc(collection(userSnapshot.ref, "posts"), {
                content: text.trim()
            });
        
            document.location.reload(true);
        }
    } else {
        alert("Your post can't be empty!");
    }
}

async function findPost() {
    const text = document.getElementById("post-search-text").value

    if (text.length > 0) {
        const post = doc(db, "users", "BYZ5WjxJwlB8Igmv35Vo", "posts", text);
        const postSnapshot = await getDoc(post);

        if (postSnapshot.exists()) {
            alert(postSnapshot.data().content);
            // console.log(postSnapshot.data());
        } else {
            alert("Can't find a post with that ID!");
        }
    } else {
        alert("Your search can't be empty!");
    }
} 

load();

document.getElementById("post-new-button").addEventListener("click", async () => {
    await addPost();
});

document.getElementById("post-search-button").addEventListener("click", async () => {
    await findPost();
});