package com.aidr.app.controller;

import java.util.Map;

import com.aidr.app.hibernateEntities.AidrCollection;
import com.aidr.app.service.CollectionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;


@Controller
public class ScreenController extends BaseController{

    @Autowired
    private CollectionService collectionService;

	@RequestMapping("protected/home")
	public String home(Map<String, String> model) throws Exception {
		return "home";
	}

	@RequestMapping("protected/task")
	public String task() throws Exception {
		return "task";
	}
	
	@RequestMapping("protected/master")
	public String master(Map<String, String> model) throws Exception {
		return "master";
	}
	
	@RequestMapping("protected/collection")
	public String collection(Map<String, String> model) throws Exception {
		return "collection";
	}

    @RequestMapping("protected/{code}/collection-details")
    public ModelAndView collectionDetails(@PathVariable(value="code") String code) throws Exception {
        AidrCollection collection = collectionService.findByCode(code);
        ModelAndView model = new ModelAndView("collection-details");
        model.addObject("id", collection.getId());
        return model;
    }

    @RequestMapping("protected/collection-create")
    public String collectionCreate(Map<String, String> model) throws Exception {
        return "collection-create";
    }

    @RequestMapping("protected/tagger-home")
    public String taggerHome(Map<String, String> model) throws Exception {
        return "tagger/home";
    }

}
