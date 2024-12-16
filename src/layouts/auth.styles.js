import styled from "styled-components";
import { COLORS } from "../lib/settings";

export const AuthWrapper = styled.div`
    width: 520px;
    // height: 500px;
    max-width: 100%;
    background: #fff;
    border: none;
    border-radius: 4px;
    display: flex;
    flex-flow: column nowrap;
    margin: 0 auto;
    padding: 24px;
    box-sizing: border-box;
    
    overflow: hidden;
    
    .submit_btn {
        width: 400px;
        height: 50px;
        background: ${COLORS.primary};
        max-width: 100%;
        border: none;
        border-radius: 4px;
        outline: none;
        color: #fff;
        font-family: inter;
        font-size: 16px;
        line-height: 24px;
        font-weight: 300;
        margin: 0 auto;
        margin-top: 24px;
        
        &:hover {
            cursor: pointer;
        }
    };
    
    .switch_type_font {
        font-family: inter;
        font-size: 16px;
        width: 400px;
        max-width: 100%;
        margin: 24px auto;
        color: ${COLORS.primary};
        text-align: center;
        
        &:hover {
            cursor: pointer;
        }
    }
    
    .float {
        display: inherit;
        flex-flow: row nowrap;
    }
    .right {
        justify-content: flex-end;
    }
    .left {
        justify-content: flex-start;
    }
    .center {
        justify-content: center;
    }
    .bottom {
        margin-top: auto;
    }
        
    .mb-32 {
        margin-bottom: 16px;
    }
        
    .hidden {
        visibility: hidden;
    }
        
    #right_dots {
        transform: translate(40px, -40px);
    }
    #left_dots {
        transform: translate(-40px, 40px);
    }
    #logo {
        height: 50px;
        width: 130px;
    }
`;

export const AuthInput = styled.input`
    width: 400px;
    height: 50px;
    max-width: 100%;
    margin: 0 auto;
    margin-bottom: 16px;
    font-family: inter;
    font-size: 16px;
    font-weight: 300;
    line-height: 24px;
    padding: 0px 16px;
    box-sizing: border-box;
    border: solid 1px #ddd;
    border-radius: 4px;

    &:focus {
        border: solid 1px green;
    }
    &:placeholder {
        color: #ddd;
    }
`;