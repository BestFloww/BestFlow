import React from "react"
import { motion } from "framer-motion"

const transition = { duration: 4, yoyo: 1, ease: "easeInOut" }

const Logo = () => {
    return(
        <svg width="205" height="205" viewBox="1 0 94 191" fill="none" xmlns="http://www.w3.org/2000/svg">
        <motion.path d="M22.7041 40.5793C23.1584 41.0793 25.8839 43.0793 27.2467 43.5793C27.2467 43.5793 31.2643 45.1756 31.7893 45.0793C34.939 44.5015 31.4511 39.5742 31.7893 36.0793C32.3364 30.4251 34.3441 27.09 36.7861 22.0793C40.1067 15.2657 44.9995 10.6137 51.7766 8.57927C56.7734 7.07927 65.2143 5.95977 68.5841 8.07928C71.7639 10.0793 74.7586 13.5581 77.215 18.5793C80.3948 25.0793 80.201 31.1408 77.215 38.0793C73.1267 47.5793 66.9868 54.5408 58.5904 59.5793C55.5823 61.3844 56.7734 60.5793 52.2308 63.0793C50.8028 63.8652 49.051 64.5793 49.051 64.5793L60.4075 71.0793C60.4075 71.0793 71.3096 78.0793 75.8522 83.0793C80.3948 88.0793 69.9469 91.0793 75.8522 96.5793C79.0937 99.5983 63.5873 111.579 50.4138 109.579C41.6271 108.245 26.3382 118.579 26.3382 118.579C26.3382 118.579 62.2245 19.5793 63.5873 17.0793C64.95 14.5793 52.6851 18.5793 50.4138 22.0793C48.1425 25.5793 16.3445 114.079 16.3445 114.079C16.3445 114.079 12.9019 111.8 10.4392 111.579C7.30598 111.299 4.22206 111.042 2.71678 114.079C1.69741 116.136 1.354 117.079 4.5338 120.579C7.71361 124.079 17.9937 129.394 27.2467 128.579C38.6031 127.579 45.5173 125.513 49.051 124.579C60.4075 121.579 78.5778 128.579 81.3033 121.579C83.7372 115.328 90.8427 114.079 91.7512 104.079C92.6831 93.8227 91.0901 90.4065 85.3916 83.0793C78.8332 74.6462 57.2277 65.5793 57.2277 65.5793C57.2277 65.5793 61.6741 63.8279 65.8586 61.5793C72.4314 58.0471 76.0051 55.0191 80.3948 48.5793C86.3206 39.8859 90.3438 32.6676 88.1172 22.0793C86.2116 13.0177 80.3948 6.07927 74.4894 3.57927C68.8329 1.18459 57.8823 1.38156 48.1425 5.07928C38.2779 8.82438 30.8807 16.0793 26.3382 22.0793C22.3439 27.3551 22.2498 40.0793 22.7041 40.5793Z" stroke="#C57EDE" stroke-opacity="0.9" stroke-width="3"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={transition}/>
        <motion.path d="M16.7988 57.0793C16.7988 57.0793 21.2797 52.0925 23.6126 50.5793C27.287 48.1959 30.7881 47.516 31.7893 52.0793C32.462 55.1457 32.2476 57.6613 29.9722 59.5793C26.23 62.7338 16.7988 57.0793 16.7988 57.0793Z" stroke="#C57EDE" stroke-opacity="0.9" stroke-width="3"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={transition}/>
        </svg>
    )
}

export default Logo;