import React, { PureComponent } from 'react'

export default class ErrorBoundary extends PureComponent {
    constructor(props) {
        super(props)
        this.state = {hasError: false}
    }

    static getDerivedStateFromError(error){
        return {hasError: true}
    }

    componentDidCatch(error, info){
        console.log(error);
        console.log(info);
    }
    
    render() {
        if(this.state.hasError){
            return <div style={{textAlign:'center'}}>
                <h1 style={{marginBottom:'20px'}}>Something went wrong!</h1>
                <div className="loader" />
            </div>
        }
        return this.props.children;
    }
}
