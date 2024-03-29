const BACKGROUND_SPACE_TRAVELLING_DISTANCE = 6.5; // 10 percent
const BACKGROUND_ASPECT_RATIO = 1.5 ; // 5472/3648
const DEGREE_TO_RADIAN = 1/(180*Math.PI);

// class Sequence {
// 	constructor(){
// 		this.actions = [];
// 		this.addToActions = function(action, length, delay){
// 			this.actions.push({
// 				delay : delay,
// 				act: action,
// 				length: length
// 			});
// 		}
// 		this.act = function(consumer){
// 			if(this.actions.length == 0){
// 				return 0;
// 			}
// 			this.__act(0,consumer);
// 		}
// 		this.__act = function(index,consumer){
// 			this.actions[index].act();
// 			if(index >= this.actions.length-1){
					
// 				return;
// 			}
// 			let timeout = setTimeout(()=>{
// 				this.__act(index+1,consumer);	
// 			}, this.actions[index].length + this.actions[index+1].delay);
// 			if(consumer != undefined){
// 				consumer(timeout);	
// 			}
// 		}
// 		this.then = function(delay, action,action_length){
// 			this.addToActions(action, action_length, delay);	
// 			return this;
// 		}
// 	}	
// }

// function createSequence(action, length){
// 	let the_sequence = new Sequence();
// 	the_sequence.addToActions(action, length, 0);
// 	return the_sequence;
// }
let on_scroll_func_map = {
};
let on_under_scroll_func_map = {
};
//sequence example
//createSequence(delay, action).then(delay, action).then(delay,action) 
let scroll_to_section = (section)=>{};
function main(){
    let tabs_element = document.querySelectorAll("nav-bar > section#tabs > p");
    let tabs_section = document.querySelector("nav-bar > section#tabs")
    /* may be dynamic later */
    // let tabs_index_map = {};
    // tabs_index_map["home-tab"] = "0"
    // tabs_index_map["about-me-tab"] = "1"
    // tabs_index_map["projects-tab"] = "2"
    let header_section = document.querySelector("header");
    let about_section = document.querySelector("main > section#about-me");
    let projects_section = document.querySelector("main > section#projects");
    let contact_section = document.querySelector("main > section#contact");
    tabs_element[0].onclick = ()=>{
        // console.log(header_section.offsetTop);
        window.scrollTo(window.scrollX, header_section.offsetTop);
    }
    tabs_element[1].onclick = ()=>{
        // console.log(about_section.getBoundingClientRect().top);
        window.scrollTo(window.scrollX, about_section.offsetTop);
    }
    tabs_element[2].onclick = ()=>{
        // console.log(projects_section.getBoundingClientRect().top);
        window.scrollTo(window.scrollX, projects_section.offsetTop);
    }
    tabs_element[3].onclick = ()=>{
        // console.log(contact_section.off);
        window.scrollTo(window.scrollX, contact_section.offsetTop);
    }
    let get_current_tab = ()=>{
       
        let selected = 0; // 1: header 2: about 3: project 4: contact
        let tab_bound_rects = [
        Math.abs(header_section.getBoundingClientRect().top),
        Math.abs(about_section.getBoundingClientRect().top),
        Math.abs(projects_section.getBoundingClientRect().top),
        Math.abs(contact_section.getBoundingClientRect().top)
        ];
        for(let i = 1;i<tab_bound_rects.length;i++){
            if(tab_bound_rects[i] < tab_bound_rects[selected]){
                selected = i;
            }
        } 
        return tabs_element[selected];
        
        // return undefined /* temporary */
    }
    let hovered_element = undefined;
    let get_hovered_element = ()=>{
        return hovered_element;
    }
    // let update_tab_highlighting = (tab)=>{
    //     let current_tab = get_current_tab();
    //     if(tab != undefined){
    //         if(tab == get_hovered_element()){
    //             tab.classList.add("highlighted");
    //             current_tab.classList.remove("highlighted");
    //         }else{
    //             tab.classList.remove("highlighted")
    //         }
    //         return;
    //     }
    //     current_tab.classList.add("highlighted");
    // }
    let update_tab_navigator = ()=>{
        let current_tab = get_current_tab();
        let hovered_element = get_hovered_element();
        current_tab.classList.add("highlighted")
        for(let i = 0;i<tabs_element.length;i++){
            if(tabs_element[i] != current_tab){
                if(tabs_element[i] == hovered_element){
                    tabs_element[i].classList.add("highlighted")
                    current_tab.classList.remove("highlighted")
                    continue;
                }
                tabs_element[i].classList.remove("highlighted");
            }
        }
    }
    update_tab_navigator();
    // get_current_tab().classList.add("highlighted");
    // let on_tab_hover = (tab)=>{
    //     tab.classList.add("highlighted");
    //     for(let i = 0;i<tabs_element.length;i++){
    //         if(tabs_element[i] != tab){
    //             tabs_element[i].classList.remove("highlighted");
    //         }
    //     }
    // }
    // let on_tab_unhover = (tab)=>{
    //     let current_tab = get_current_tab();
    //     if(current_tab == tab){
    //         return;
    //     }
    //     if(current_tab != undefined){
    //         current_tab.classList.add("highlighted");
    //     }
    //     tab.classList.remove("highlighted");
        
    // }
    let discord_icon = document.querySelector("footer > section#online > figure.image-container#discord > div.image-content");
    let announcer = document.querySelector("footer > section#online > figure.image-container#discord > p#anouncement");
    discord_icon.onclick = (e)=>{
        navigator.clipboard.writeText('sonny03030303');
        announcer.innerHTML = "Copied✓";
    }
    let prev_hovered_element = undefined;
    document.addEventListener("mousemove",(e)=>{
        hovered_element = e.target;
        update_tab_navigator();
        // for(let i = 0;i<tabs_element.length;i++){
        //     // if(e.target == tabs_element[i]){
        //     //     on_tab_hover(tabs_element[i]);
        //     // }else if(tabs_element[i] == prev_hovered_element){
        //     //     on_tab_unhover(tabs_element[i]);
        //     // }
        //     // update_tab_highlighting(tabs_element[i]);
        // }
        if((e.target == discord_icon && prev_hovered_element != discord_icon) || (prev_hovered_element == discord_icon && e.target != discord_icon )){
            announcer.innerHTML = "Copy <b><u>sonny03030303</u></b> to clipboard";
        }
        prev_hovered_element = e.target;
    },false)
	let registered_for_scroll_effect = document.querySelectorAll(".scroll-property");

	for(let i =0;i<registered_for_scroll_effect.length;i++){
	    let element = registered_for_scroll_effect[i];
        element.style.setProperty("--scroll-effect-frame",
        "calc( clamp(0, 1 - (var(--y-position-on-view-normalized) - var(--end)) / var(--range) , 1) )")
    }
	let update_scroll_property = ()=>{
		for(let i =0;i<registered_for_scroll_effect.length;i++){
			let element = registered_for_scroll_effect[i];
			let y = element.getBoundingClientRect().top;
			let y_as_percentage = y / window.innerHeight;	
			element.style.setProperty("--y-position-on-view", y.toString());
			element.style.setProperty("--y-position-on-view-normalized", y_as_percentage.toString());
		}
	}
	update_scroll_property();
	let registered_scripted_scroll_element = document.querySelectorAll(".scripted-scroll-effect");
	let on_scroll_func = [];
	let on_under_scroll_func = [];
	for(let i =0;i<registered_scripted_scroll_element.length;i++){
		let element = registered_scripted_scroll_element[i];
		on_scroll_func.push(element.getAttribute("on-scrolled-to"));
		on_under_scroll_func.push(element.getAttribute("on-under-scrolled"));
	}
	
	let update_rsse = ()=>{
		for(let i =0;i<registered_scripted_scroll_element.length;i++){
			let element = registered_scripted_scroll_element[i];
			// elemet_relative_y_position
			let eryp = element.getBoundingClientRect().top/ window.innerHeight;
			let upper_fence = Number.parseFloat(element.getAttribute("scripted-scroll-upperfence"));
			let lower_fence =Number.parseFloat(element.getAttribute("scripted-scroll-lowerfence"));
			if(upper_fence != upper_fence || lower_fence != lower_fence){
				return;
			}	
			if(eryp < upper_fence){
				element.classList.remove("under-scrolled");	
				element.classList.remove("scrolled-to");	
				element.classList.add("over-scrolled");
			}else if(eryp > lower_fence){
				element.classList.add("under-scrolled");	
				if(on_under_scroll_func[i] != null || on_under_scroll_func[i] != undefined){
					on_under_scroll_func_map[on_under_scroll_func[i]]();
				}
				element.classList.remove("scrolled-to");	
				element.classList.remove("over-scrolled");
			}else if(eryp >= upper_fence && eryp <= lower_fence){
				element.classList.remove("under-scrolled");	
				element.classList.add("scrolled-to");	
				if(on_scroll_func[i] != null || on_scroll_func[i] != undefined){
					on_scroll_func_map[on_scroll_func[i]]();
				}
				element.classList.remove("over-scrolled");
			}
		}
	}
	update_rsse();
	document.addEventListener("scroll",(e)=>{
        
        update_tab_navigator();
		//update scroll property
		update_scroll_property();
		update_rsse();
		
	},false);

    let contact_form = document.querySelector("main > section#contact > form");
    let form_fname = document.querySelector("main > section#contact > form > input#first_name");
    let form_lname = document.querySelector("main > section#contact > form > input#last_name");
    let form_pnumber = document.querySelector("main > section#contact > form > input#phone_number");
    let form_email = document.querySelector("main > section#contact > form > input#email");
    let form_message = document.querySelector("main > section#contact > form > textarea#message");
    let form_purpose = document.querySelector("main > section#contact > form > select#purpose");

    let label_fname = document.querySelector("main > section#contact > form > label#first_name");
    let label_lname = document.querySelector("main > section#contact > form > label#last_name");
    let label_email = document.querySelector("main > section#contact > form > label#email");
    let label_message = document.querySelector("main > section#contact > form > label#message");
    let label_purpose = document.querySelector("main > section#contact > form > label#purpose");
    let make_param = (param_name, value)=>{
        return encodeURIComponent(param_name) + "=" + encodeURIComponent(value);
    }
    contact_form.onsubmit = (e)=>{
        //reset state of inputs
        label_fname.classList.remove("invalid");
        label_lname.classList.remove("invalid");
        label_email.classList.remove("invalid");
        label_message.classList.remove("invalid");
        label_purpose.classList.remove("invalid");
        let fname = form_fname.value;
        let lname = form_lname.value;
        let email = form_email.value;
        let message = form_message.value;
        let purpose = form_purpose.value;
        let flag = false;
        if(fname.trim() == ''){
            label_fname.classList.add("invalid");
            flag = true;
        }
        if(lname.trim() == ''){
            label_lname.classList.add("invalid");
            flag = true;
        }
        if(email.trim() == ''){
            label_email.classList.add("invalid");
            flag = true;
        }
        if(message == '' || message == undefined){
            label_message.classList.add("invalid");
            flag = true;
        }
        if(purpose == "(unset)"){
            label_purpose.classList.add("invalid");
            flag = true;
        }
        e.preventDefault();
        if(flag){
            alert("Please fill in necessary information");
            return;
        }        

        let encodedParams = [
            make_param("fname",fname),
            make_param("lname",lname),
            make_param("email",email),
            make_param("message",message),
            make_param("purpose",purpose),
        ];
        let url = "contact/index.html?"+encodedParams.join("&");
        // alert(url);
        // console.log(url);
        window.location.replace(url);

        
    } 
    // console.log(tabs_element); 

    //background stuffs (leave it here for not, Im gonna embed shader to make the univese, I want it so bad)
    /* disable it for now */
    // let background_image_element = document.querySelector("background > figure.image-container > .image-content");
    // let background_offset_x = 7.07106781;
    // let background_offset_y = 7.07106781;
    // background_image_element.style.setProperty("--background-image-x-offset", background_offset_x.toString());
    // background_image_element.style.setProperty("--background-image-y-offset", background_offset_y.toString());
    // let move_background_randomly = ()=>{
    //     //debugging purpose only
    //     let selected_angle = 360.0 * Math.random();
    //     let travel_x = Math.cos(selected_angle*DEGREE_TO_RADIAN)/ BACKGROUND_ASPECT_RATIO * BACKGROUND_SPACE_TRAVELLING_DISTANCE;
    //     let travel_y = Math.sin(selected_angle*DEGREE_TO_RADIAN) * BACKGROUND_SPACE_TRAVELLING_DISTANCE;
        
    //     background_offset_x+=travel_x;
    //     background_offset_y+=travel_y;
    //     if(background_offset_x > 100 || background_offset_x < 0){
    //         background_offset_x-=travel_x*2;
    //     }

    //     if(background_offset_y > 100 || background_offset_y < 0){
    //         background_offset_y-=travel_y*2;
    //     }

    //     background_image_element.style.setProperty("--background-image-x-offset", background_offset_x.toString());
    //     background_image_element.style.setProperty("--background-image-y-offset", background_offset_y.toString());
    // };
    // setInterval(() => {
    //     move_background_randomly();
    // }, 4001);
}

main();
