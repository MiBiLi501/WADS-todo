import {Link} from "react-router-dom";

{/* <Link to="/Dashboard"> Dashboard </Link> */}
function Login() {
    return (
    <>
        <div className="w-full fixed h-full flex flex-col items-center justify-center">
            <form className="h-2/5 bg-slate-800 p-10" name=''>
                <label htmlFor="username">Username</label>
                <input
                type='text'
                id='username'
                // name='title'
                // onChange={(e) => setTitle(e.target.value.toUpperCase())}
                // value={title}
                // placeholder='Enter title'/>
                />
                <p>test</p>
                <input >
                {/* // onChange={(e) => setDescription(e.target.value)}
                // placeholder='Enter task decription'
                // value={description}> */}
                </input>
                <button type='submit'>Done</button>
            </form>
        </div>
    </>)
}

export default Login;