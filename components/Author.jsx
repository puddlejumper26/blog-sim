import { React, Component } from "react";
import Image from "next/image";

// const Author = ({ author }) => (
//   const newMethod=()=>{},
//   return(

// <div className="text-center mt-20 mb-8 p-12 relative rounded-lg bg-black bg-opacity-20">
//   <div className="absolute left-0 right-0 -top-14">
//     <Image
//       unoptimized
//       alt={author.name}
//       height="100px"
//       width="100px"
//       className="align-middle rounded-full"
//       src={author.photo.url}
//       onLoadingComplete={newMethod(author.name)}
//     />
//   </div>
//   <h3 className="text-white mt-4 mb-4 text-xl font-bold">{author.name}</h3>
//   <p className="text-white text-ls">{author.bio}</p>
// </div>
//   )
// );

/**
 *  apply old react method to realized the onLoadingComplete
 */
class Author extends Component {
  constructor(props) {
    super(props);
  }
  handleClick() {
    console.log("handleClick");
  }
  render() {
    return (
      <>
        <div className="text-center mt-20 mb-8 p-12 relative rounded-lg bg-black bg-opacity-20">
          <div className="absolute left-0 right-0 -top-14">
            <Image
              unoptimized
              alt={this.props.author.name}
              height="100px"
              width="100px"
              className="align-middle rounded-full"
              src={this.props.author.photo.url}
              onLoadingComplete={this.handleClick}
            />
          </div>
          <h3 className="text-white mt-4 mb-4 text-xl font-bold">
            {this.props.author.name}
          </h3>
          <p className="text-white text-ls">{this.props.author.bio}</p>
        </div>
      </>
    );
  }
}

export default Author;
