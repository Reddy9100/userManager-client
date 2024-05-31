import Aos from "aos"
import { useEffect } from "react"
const About = () => {

  useEffect(()=>{
    Aos.init({duration: 2000});
  })

  return (
    <div>
        <div className="container overflow-x-hidden min-h-screen flex flex-col justify-center items-center mx-auto p-4" >
          <h1 className="text-4xl font-bold text-center mb-8">What We Do</h1>
          <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4">
            {/* Add User Card */}
            <div className="bg-black text-white p-6 rounded-lg shadow-lg flex flex-col items-center text-center" data-aos="fade-right">
              <div className="bg-blue-100 rounded-full p-4 mb-4">
                <i className="fas fa-user-plus fa-2x text-blue-500"></i>
              </div>
              <h2 className="text-xl font-semibold mb-2">Add User</h2>
              <p className="text-white mb-4">Create new user accounts quickly and easily with our streamlined process.</p>
              <div className="text-white">
                <p>✓ Easy account setup</p>
                <p>✓ Secure data handling</p>
                <p>✓ User-friendly interface</p>
              </div>
            </div>
            {/* Update User Card */}
            <div className="bg-black p-6 rounded-lg shadow-lg flex flex-col items-center " data-aos="fade-left">
              <div className="bg-yellow-100 rounded-full p-4 mb-4">
                <i className="fas fa-user-edit fa-2x text-yellow-500"></i>
              </div>
              <h2 className="text-xl font-semibold mb-2">Update User</h2>
              <p className="text-white mb-4">Edit existing user details to keep your records up to date and accurate.</p>
              <div className="text-white">
                <p>✓ Real-time updates</p>
                <p>✓ Detailed user information</p>
                <p>✓ Audit trails</p>
              </div>
            </div>
            {/* Delete User Card */}
            <div className="bg-black p-6 rounded-lg shadow-lg flex flex-col items-center " data-aos="fade-right">
              <div className="bg-red-100 rounded-full p-4 mb-4">
                <i className="fas fa-user-minus fa-2x text-red-500"></i>
              </div>
              <h2 className="text-xl font-semibold mb-2">Delete User</h2>
              <p className="text-white mb-4">Remove user accounts securely with our efficient deletion system.</p>
              <div className="text-white">
                <p>✓ Secure deletion process</p>
                <p>✓ Data privacy ensured</p>
                <p>✓ Compliance with regulations</p>
              </div>
            </div>
            <div className="bg-black p-6 rounded-lg shadow-lg flex flex-col items-center " data-aos="fade-left">
              <div className="bg-green-100 rounded-full p-4 mb-4">
                <i className="fas fa-thumbs-up fa-2x text-green-500"></i>
              </div>
              <h2 className="text-xl font-semibold mb-2">Like User</h2>
              <p className="text-white mb-4">Show appreciation by giving users a thumbs up to recognize their contributions.</p>
              <div className="text-white">
                <p>✓ Recognize efforts</p>
                <p>✓ Boost morale</p>
                <p>✓ Foster a positive environment</p>
              </div>
    </div>
</div>
</div>
</div>
  )
}

export default About