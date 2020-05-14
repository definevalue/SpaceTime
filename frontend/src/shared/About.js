import React, {useState, useEffect} from 'react';
import auth from '../authComponent/helper'
import FindPeople from '../userComponent/FindPeople'

const About = () => {
    const [defaultPage, setDefaultPage] = useState(false)

    useEffect(() => {
        setDefaultPage(auth.isAuthenticated())
        // const unlisten = history.listen(() => {
        //     setDefaultPage(auth.isAuthenticated())
        // })
        // return () => {
        //     unlisten()
        // }
    }, []);

    return (
        <div>
            {defaultPage && <FindPeople />}
        </div>
    );
}

export default About;