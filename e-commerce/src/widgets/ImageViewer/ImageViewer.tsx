import { Box, ImageList, ImageListItem } from "@mui/material";
import { useState, MouseEvent } from "react";

interface ImageViewerProps {
    
}
const data = {
    id: 1,
    img: "https://m.media-amazon.com/images/I/81M2m0Eh2vL._AC_UY436_FMwebp_QL65_.jpg",
    imges: [
        "https://m.media-amazon.com/images/I/81M2m0Eh2vL._AC_UY436_FMwebp_QL65_.jpg",
        "https://m.media-amazon.com/images/I/81q0vIRHV4L._AC_SL1500_.jpg",
        "https://m.media-amazon.com/images/I/81B3HTt-BOL._AC_SL1500_.jpg",
        "https://m.media-amazon.com/images/I/71wrLA73ODL._AC_SL1500_.jpg"
    ],
    title: "IKEA Bergenes Holder for Mobile Phone Tablet Bamboo 104.579.99, Length: 5' Width: 3 ¼ '",
    price: 5,
    rating: 4.4,
    brand: "IKEA",
    description: "Package Dimensions: 1.778 cms (L) x 7.874 cms (W) x 1.778 cms (H);Product Type: Portable Electronic Device Stand;Package Quantity: 1;Country Of Origin: China"
}

const ImageViewer: React.FC<ImageViewerProps> = (props) => {

    const [currentImage, setCurrentImage] = useState<number>(0);


    return <Box sx={{display: "flex"}}>
        <Box sx={{width: "30%"}}>
        {data.imges.map(((img, id) => {
            return <img 
            style={{width: "100%", aspectRatio: 1, objectFit: "contain"}}
            key = {id}
            img-key = {id}
            src={img}
            alt=""
            onMouseEnter={() => setCurrentImage(id)}/>;
        }))}

        <ImageList sx={{ width: 500, height: 450 }} cols={1} rowHeight={164}>
        {data.imges.map((img, idx) => (
            <ImageListItem key={idx}>
            <img
                src={`${img}?w=164&h=164&fit=crop&auto=format`}/>
            </ImageListItem>
        ))}
        </ImageList>

        </Box>
        <Box sx={{width: "70%"}}>
            <img src={data.imges[currentImage]} alt="" />
        </Box>
    </Box>;
}
 
export default ImageViewer;